#!/usr/bin/env node

/**
 * This file is utilized at the start of execution of the program
 */

import chalk from 'chalk';
import clear from 'clear';
import { Section } from 'command-line-usage';
import inquirer from 'inquirer';
import { USAGE_TEMPLATE } from './config';
import { isFeatureGroup, readMainConfig, readSubConfig } from './lib/files';
import * as util from './lib/util';

import { contentPopulate, featureConfigurationAssignment, getFeatureMenu } from './lib/helper-functions';
import * as MODULE_NEW from './modules/new';
import { getQuestionByGroup, handleAddGroupRequest } from './modules/new/config';

import { CLI_DEFAULT } from './default objects/cli-description';
import { CLI, Config, Group, ModuleDescriptor } from './types/cli';
import { Command } from './types/index';

import { ADD_ACTION, ADD_GROUP, LIST_ACTION } from './constants/constants';
const two = 2;
// Assign CLI object a default value
export let CLI_DESCRIPTION: CLI = CLI_DEFAULT;

/**
 * Parse commands provided by template manifest files
 * and generate the CLI help menus as well as extract
 * info useful for generating the sub features
 * @param feature - Feature that the user inputed (eg. project, page, component)
 * @param required - Boolean value which tells you if the feature is required or not.
 *                   Required features include 'config' and 'store'
 * @param index - Index of menu to be populated
 */
async function populateFeatureMenu(feature: string, required = false, index: number) {
  let featureConfig: Config;
  let cliFeature: ModuleDescriptor | Config;
  featureConfig = readSubConfig(feature);

  // [1] Based of the feature that the user inputs, the configuration property is populated
  featureConfigurationAssignment(feature, featureConfig);

  // [2] Add feature, under the "Features: " header,
  // to general help menu if not required for new project generation
  if (!required) {
    contentPopulate(
      CLI_DESCRIPTION.general.menu,
      `${index === two ? chalk.magenta(feature) : chalk.yellow(feature)}`,
      `${featureConfig.description}`,
      index
    );
  }

  // [3] Assign the configuration for the specified feature
  cliFeature = getFeatureMenu(feature);

  // [4] Create menu specific to a feature entered by user
  // The USAGE_TEMPLATE in ./config.ts is used as base.
  cliFeature.menu = USAGE_TEMPLATE(undefined, undefined, feature, undefined,
    undefined);

  cliFeature.menu.splice(index, 0, {
    header: 'Feature:',
    content: [],
  });
}

/**
 * Description: Adding the necessary information to the Usage object to be used in command execution
 * @param features - acceptable features that can be created with rdvue
 * @param requiredFeatures - features that can't be user requested
 * but are required to create a project (eg. config and store)
 * @param featureGroups - feature groups data from template.json
 *  describes each feature group
 * @param mainConfig - config data populated from template.json.
 * Describes options the tool can take.
 */
async function populateCLIMenu(features: string[], requiredFeatures: string[],
  featureGroups: Group[],
  mainConfig: Config) {

  let featureConfig: Config;
  let iterations = 0;
  let index: number;
  const three = 3;

  // [1] Intialize the CLI menu with the USAGE_TEMPLATE (./config.ts)
  CLI_DESCRIPTION.general.menu = USAGE_TEMPLATE();

  // Gets a multidimensional array of all modules from the different feature groups
  let optionalModules = featureGroups.map((g) => g.modules);



  // Flatten array into one
  optionalModules = [].concat.apply([], optionalModules as []);
  const mergedFeatures = features.concat(optionalModules as []);
  for (const feature of features) {
    // [2] Check each item of list to see if its a feature group or just a feature
    const isGroup: boolean = isFeatureGroup(feature);
    // [3] Set the index on the menu list to be modified/added
    index = isGroup ? three : two;

    // [4] Check if the features/ group is present on menu list and populate if isnt
    if (
      !(Object
        .values(CLI_DESCRIPTION.general.menu[index])
        .includes('Features:' || 'Feature Groups:'))
    ) {

      CLI_DESCRIPTION.general.menu.splice(index, 0, {
        header: isGroup ? 'Feature Groups:' : 'Features:',
        content: [],
      });
    }

    // [5] Add project config to CLI_DESCRIPTION
    if (iterations < 1) {
      contentPopulate(
        CLI_DESCRIPTION.general.menu,
        `${chalk.magenta('project')}`,
        'Generate a new project.', index
      );
    }

    iterations++;

    // [6] Parse features provided by template manifest files and generate the CLI help menus
    // for both required and non required features depending on user input
    await populateFeatureMenu(feature, undefined, index);
  }

  for (const feature of requiredFeatures) {
    const isGroup: boolean = isFeatureGroup(feature);
    index = isGroup ? three : two;
    await populateFeatureMenu(feature, true, index);
  }

  for (const feature of optionalModules as []) {
    index = 3;

    if (
      !(Object
        .values(CLI_DESCRIPTION.general.menu[index])
        .includes('Feature Groups:'))
    ) {
      CLI_DESCRIPTION.general.menu.splice(index, 0, {
        header: 'Feature Groups:',
        content: [],
      });
    }
    await populateFeatureMenu(feature, undefined, index);
  }

  // [5] Add 'project' to list of features input by user
  features.push('project');

  // [6] Creating 'project' features configuration
  featureConfig = mainConfig;
  featureConfig.name = 'project';
  featureConfig.arguments = [{
    'name': 'projectName',
    'type': 'string',
    'description': 'the name for the generated project.'
  },
  {
    'name': 'projectNameKebab',
    'type': 'string',
    'description': 'the name in Kebab-case for the generated project.',
    'isPrivate': true
  }
  ];

  // [7] Setting the project config to the newly created featureConfig
  CLI_DESCRIPTION.project.config = featureConfig;
}



export async function run(userArguments: [] | undefined) {

  try {
    // [1a] Assign config to object return from JSON parse
    const mainConfig = readMainConfig();


    // [1b] Return list of features if true and empty array if false
    const features: string[] = (mainConfig.import !== undefined) ? mainConfig
      .import.optional : [];

    // [1c] Return value if true and empty array if false
    const requiredFeatures: string[] = (mainConfig.import !== undefined) ?
      mainConfig.import.required : [];

    // [1d] return array of available groups
    const featureGroups: Group[] = (mainConfig.import?.groups !== undefined) ?
      mainConfig.import.groups : [];

    const sliceNumber = 2;
    // [1e] Check for user arguments
    if (userArguments === undefined) {
      const userArgs = process.argv.slice(sliceNumber);

      let project;
      let operation: Command;

      // [2] Clear the console
      clear();

      // [3] Populate feature usage information
      await populateCLIMenu(features, requiredFeatures, featureGroups, mainConfig);

      // [4] Display "rdvue" heading
      util.heading();

      // [5] Puts the user arguments into an object that seperates them into action,
      // feature, option and feature name from format
      // rdvue <action> <feature> <feature name> [options]
      operation = {
        action: util.parseUserInput(userArgs, features).action,
        feature: `${util.parseUserInput(userArgs, features).feature}`,
        options: util.parseUserInput(userArgs, features).options,
        featureName: util.parseUserInput(userArgs, features).featureName,
      };

      // [6] Check to see if user arguments include any valid features
      if (operation.action !== '' && operation.feature !== '') {

        // [7a] Check to see if the project is valid
        project = util.checkProjectValidity(operation);
        if (project.isValid) {

          // [7b] Check if user requested a feature Group Type
          if (operation.action === ADD_GROUP) {
            const selectedModule = await handleAddGroupRequest(operation.feature);
            clear();
            util.heading();

            if (selectedModule !== '' && util.isOptionalFeature(selectedModule)) {
              // [7c] Updates operation.feature to the selected module
              operation.feature = selectedModule;

              // [7d] Call the run function in modules / new /index.ts
              await MODULE_NEW.run(operation, CLI_DESCRIPTION);
            }

          } else {
            if (operation.action === ADD_ACTION && !util.isOptionalFeature(operation.feature)) {
              clear();
              console.log(util.displayHelp(CLI_DESCRIPTION.general.menu));
              throw Error(`${operation.feature} is not a valid Optional Feature. See menu above.`);
            }
            else {
              if (operation.action === LIST_ACTION) {
                clear();
                util.heading();

                util.displayModulesByFeatureGroup();
              }
              else {
                // [8a] Call the run function in modules/new/index.ts
                await MODULE_NEW.run(operation, CLI_DESCRIPTION);
              }
            }
          }

        } else {

          // [8b] Throw an error if this is not a valid project
          throw Error(
            `A ${operation.feature} cannot be created/modified in invalid Vue project: '${process.cwd()}'`
          );
        }
      } else if (util.hasHelpOption(userArgs)) {
        // [7b] The user has asked for help -> Gracefully display help menu
        // NB: The feature 'project' does not have its own help menu as
        // it does not have its own manifest file
        if (util.hasFeature(userArgs, features) && operation.feature !==
          'project') {
          const CLIPROPERTY = getFeatureMenu(operation.feature);
          // tslint:disable-next-line
          console.log(util.displayHelp(CLIPROPERTY.menu as Section[]));
        } else {
          // tslint:disable-next-line
          console.log(util.displayHelp(CLI_DESCRIPTION.general.menu));
        }
      } else {
        // [6c] Show Help Text if no valid feature/action have been inputted
        // TODO: Throw and error for invalid command
        // tslint:disable-next-line
        console.log(util.displayHelp(CLI_DESCRIPTION.general.menu));
        throw Error(
          `The command entered was invalid. Please see help menu above.`);
      }

      // [6] Force process to exit
      process.exit();
    } else {
      // [1d] Check for user arguments
      const userArgs = userArguments;

      let project;

      // [2] Populate feature usage information
      await populateCLIMenu(features, requiredFeatures, featureGroups, mainConfig);

      // [3] Check to see if user arguments include any valid features
      if (util.hasFeature(userArgs, features)) {

        // [4] Puts the user arguments into an object that seperates them into action,
        // feature option and feature name from format
        // rdvue <action> <feature> <feature name> [options]
        // TODO: TRY CATCH???
        const operation: Command = {
          action: util.parseUserInput(userArgs, features).action,
          feature: `${util.parseUserInput(userArgs, features).feature}`,
          options: util.parseUserInput(userArgs, features).options,
          featureName: util.parseUserInput(userArgs, features).featureName,
        };

        // [5a] Check to see if the project is valid
        project = util.checkProjectValidity(operation);
        if (project.isValid) {

          // [6a] Check if user requested a feature Group Type
          if (operation.action === ADD_GROUP) {
            const selectedModule = await handleAddGroupRequest(operation.feature);
            clear();

            if (selectedModule !== '') {
              operation.feature = selectedModule;

              await MODULE_NEW.run(operation, CLI_DESCRIPTION);
            }

          } else {
            if (operation.action === ADD_ACTION && !util.isOptionalFeature(operation.feature)) {

              console.log(util.displayHelp(CLI_DESCRIPTION.general.menu));
              throw Error(`${operation.feature} is not a valid Optional Feature. See menu above.`);
            }
            else {
              if (operation.action === LIST_ACTION) {
                util.displayModulesByFeatureGroup();
              }
              else {
                await MODULE_NEW.run(operation, CLI_DESCRIPTION);
              }
            }
          }

        } else {

          // [6b] Throw an error if this is not a valid project
          throw Error(`'${process.cwd()}' is not a valid Vue project.`);
        }
      } else {

        // [6c] Show Help Text if no valid feature/action have been inputted
        // TODO: Throw and error for invalid command
        console.log(util.displayHelp(CLI_DESCRIPTION.general.menu));
      }
    }
  } catch (err) {

    // TODO: Implement more contextual errors
    if (err) {
      // tslint:disable-next-line
      console.log(chalk.red(`${err}`));
    }

  }
}

run(undefined)
  .then(() => {
    console.info('');
  })
  .catch((err: Error) => {
    console.error(`Error at run: ${err}`);
  });
