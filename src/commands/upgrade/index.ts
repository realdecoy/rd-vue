import shell from 'shelljs';
import { Command, flags } from '@oclif/command';
import path from 'path';
import chalk from 'chalk';
import { checkProjectValidity, isJsonString } from '../../lib/utilities';
import { copyFiles, deleteFile, readFile } from '../../lib/files';
import { CLI_COMMANDS, CLI_STATE, TEMPLATE_REPO, TEMPLATE_ROOT, TEMPLATE_TAG, DOCUMENTATION_LINKS } from '../../lib/constants';
import {  CHANGE_LOG, ChangelogConfigTypes } from '../../lib/changelog';
import { ChangeLog, changeLogFile, ChangelogResources, ChangelogResourcesContent, Files } from '../../modules';

const CUSTOM_ERROR_CODES = [
  'project-invalid',
];

export default class Upgrade extends Command {
  static description = 'Specify the rdvue template version for a project'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [
    { name: 'name', description: 'rdvue version' },
  ]

  // override Command class error handler
  catch(error: Error): Promise<any> {
    const errorMessage = error.message;
    const isValidJSON = isJsonString(errorMessage);
    const parsedError = isValidJSON ? JSON.parse(errorMessage) : {};
    const customErrorCode = parsedError.code;
    const customErrorMessage = parsedError.message;
    const hasCustomErrorCode = customErrorCode !== undefined;

    if (hasCustomErrorCode === false) {
      // throw cli errors to be handled globally
      throw errorMessage;
    }

    // handle errors thrown with known error codes
    if (CUSTOM_ERROR_CODES.includes(customErrorCode)) {
      this.log(`${CLI_STATE.Error} ${customErrorMessage}`);
    } else {
      throw new Error(customErrorMessage);
    }

    return Promise.resolve();
  }

  async createFiles (projectRoot: string, temporaryProjectFolder:string, resources: ChangelogResources[]): Promise<void> {

    for (const resource of resources) {
      
      try {        
        const src = resource.srcPath as string;
        const dest = resource.destPath;
        const file = [resource.file as changeLogFile] as Array<string | Files>;

        const srcDir = path.join(temporaryProjectFolder, src)
        const destDir = path.join(projectRoot, dest)

        await copyFiles(srcDir, destDir, file);
      } catch (error) {
        this.log(`${CLI_STATE.Warning} could not create file at: ${chalk.yellow(file)}`);
      }
    }
  }

  /**
   * @TODO complete process for updating package.json
   */
  async updateFiles (projectRoot: string, resources: ChangelogResources[]): Promise<void> {

    for (const resource of resources) {

      const src = resource.srcPath as string;
      const dest = resource.destPath;
      const name = resource.name;
      const contents = resource.contents as ChangelogResourcesContent[];

      if (contents.length) {
        const rawJsonData = await readFile(path.join(projectRoot, name as string));
        const parsedJsonData = JSON.parse(rawJsonData);
        for (const content of contents) {
          const keys: string[] = content.key.split('.');
          const recurse = (data: any) => {
            if(!data){
              return
            }
            const currentKey = keys.pop();
            if(keys.length) {
              recurse(data[currentKey as string])
            } else {
              if (content.operation === 'remove') {
                delete data[currentKey as string];
              } else if (content.operation === 'add') {
                data[currentKey as string] = content.value;
              }
            }
          }
          recurse(parsedJsonData);
        }
      }
    }
  }
  
  async removeFiles (projectRoot: string, resources: ChangelogResources[]): Promise<void> {

    for (const resource of resources) {

      const dest = resource.destPath;
      const name = resource.name as string;

      const destDir = path.join(projectRoot, dest);
      const targetFile = path.join(destDir, name);

      try {
        deleteFile(targetFile);
      } catch (error) {
        this.log(`${CLI_STATE.Warning} could not find file at: ${chalk.yellow(targetFile)} to delete`);
      }
    }
  }

  async run(): Promise<void> {
    const { isValid: isValidProject, projectRoot } = checkProjectValidity();
    // block command unless being run within an rdvue project
    if (isValidProject === false) {
      throw new Error(
        JSON.stringify({
          code: 'project-invalid',
          message: `${CLI_COMMANDS.Upgrade} command must be run in an existing ${chalk.yellow('rdvue')} project`,
        }),
      );
    }

    const { args } = this.parse(Upgrade);
    const template: string = TEMPLATE_REPO;
    const versionName = args.name ?? TEMPLATE_TAG;
    const temporaryProjectFolder = path.join(projectRoot, 'node_modules', '_temp');
    const templateSourcePath = path.join(temporaryProjectFolder, TEMPLATE_ROOT);
    const templateDestinationPath = path.join(projectRoot, '.rdvue');

    // retrieve project files from template source
    await shell.exec(`git clone ${template} --depth 1 --branch ${versionName} ${temporaryProjectFolder}`, { silent: true });
    // copy template files to project local template storage
    await shell.exec(`cp -R ${templateSourcePath} ${templateDestinationPath}`);

    // Steps
    // 1. read package.json file form project root
    // 2. compare packages in existing package.json with the updated package.json cloned in above
    // 3. remove unused project dependencies and devDependencies
    // 4. add missing packages to project dependencies and devDependencies
    // 5. update existing packages to appropriate versions
    // 6. write package.json file back to project root
    // 7. remove unused files ( vue.config.js, .env, .env.example, .package-lock.json )
    // 8. include new project folders and files ( scripts/config, config/.env, config/.env.example, webpack.config.js )
    // 9. update existing project files ( main.ts, tsconfig.json, tailwind.config.js, src/pages/hello-world, readme )
    
    const changeLogData = CHANGE_LOG;

    //await this.removeFiles(projectRoot, changeLogData[ChangelogConfigTypes.DELETE].resources as ChangelogResources[])
    //await this.createFiles(projectRoot, temporaryProjectFolder, changeLogData[ChangelogConfigTypes.CREATE].resources as ChangelogResources[])
    await this.updateFiles(projectRoot, changeLogData[ChangelogConfigTypes.UPDATE].resources as ChangelogResources[])
      

    // 10. create a module within this command that can carry out the above actions for a specified version

    // // remove temp folder from project
    // await shell.exec(`rm -rf ${temporaryProjectFolder}`);

    this.log(`${CLI_STATE.Success} rdvue updated to version: ${chalk.green(versionName)}`);

    this.log(`\n  ${chalk.yellow('rdvue')} has been updated to use the esbuild bundler!\n  Learn more here: ${chalk.yellow(DOCUMENTATION_LINKS.EsBuild)}\n`);
  }
}
