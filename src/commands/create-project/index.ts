import shell from 'shelljs'
import chalk from 'chalk'
import {Command, flags} from '@oclif/command'
import {toKebabCase, parseProjectName, isJsonString, checkProjectValidity} from '../../lib/utilities'
import {replaceInFiles} from '../../lib/files'
import {
  TEMPLATE_REPO,
  TEMPLATE_VERSION,
  TEMPLATE_PROJECT_NAME_REGEX,
  TEMPLATE_REPLACEMENT_FILES} from '../../lib/constants';

export default class CreateProject extends Command {
  static description = 'create a new rdvue project'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {name: 'name', description: 'name of created project'},
  ]

  // override Command class error handler
  async catch(error: Error) {
    const errorMessage = error.message
    const isValidJSON = isJsonString(errorMessage)
    const parsedError = isValidJSON ? JSON.parse(errorMessage) : {}
    const customErrorCode = parsedError.code
    const customErrorMessage = parsedError.message
    const hasCustomErrorCode = customErrorCode !== undefined

    if (!hasCustomErrorCode) {
      // throw cli errors to be handled globally
      throw errorMessage
    }

    // handle errors thrown with known error codes
    switch (customErrorCode) {
    case 'existing-project': this.log(`${chalk.red('[rdvue]')} ${customErrorMessage}`)
      break
    case 'file-not-changed': this.log(`${chalk.red('[rdvue]')} ${customErrorMessage}`)
      break
    default: throw new Error(customErrorMessage)
    }

    // exit with status code
    // this.exit(1)
  }

  async run() {
    const {args} = this.parse(CreateProject)
    const template: string = TEMPLATE_REPO
    const tag: string = TEMPLATE_VERSION
    const replaceRegex = TEMPLATE_PROJECT_NAME_REGEX
    let filesToReplace = TEMPLATE_REPLACEMENT_FILES
    let projectName: string
    const {isValid: isValidProject} = checkProjectValidity()

    // block command if being run within an rdvue project
    if (isValidProject) {
      throw new Error(
        JSON.stringify({
          code: 'existing-project',
          message: `you are already in an existing ${chalk.yellow('rdvue')} project`,
        })
      )
    }

    // retrieve project name
    projectName = await parseProjectName(args)
    // convert project name to kebab case
    projectName = toKebabCase(projectName)
    // update files to be replaced with project name reference
    filesToReplace = filesToReplace.map(p => `${projectName}/${p}`)

    this.log(`${chalk.yellow('[rdvue]')} creating project${chalk.magenta(':')} ${projectName}`)

    // retrieve project files from template source
    await shell.exec(`git clone ${template} --depth 1 --branch ${tag} ${projectName} -q -c advice.detachedHead=false`)
    // remove git folder reference to base project
    await shell.exec(`rm -rf ${projectName}/.git`)
    // find and replace project name references
    const success = await replaceInFiles(filesToReplace, replaceRegex, `${projectName}`)

    if (success === false) {
      throw new Error(
        JSON.stringify({
          code: 'file-not-changed',
          message: `${chalk.red('[rdvue]')} udpating your project failed`,
        })
      )
    } else {
      this.log(`${chalk.yellow('[rdvue]')} ${projectName} is ready!`)
    }

    // Output final instructions to user
    this.log(`\nNext Steps:\n${chalk.magenta('-')} cd ${projectName}\n${chalk.magenta('-')} npm install\n${chalk.magenta('-')} npm run serve`)
  }
}
