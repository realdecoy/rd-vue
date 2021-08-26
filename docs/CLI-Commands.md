# CLI Commands
--------------
The Rdvue command line tool (CLI) is the main entry point for getting up and running with the Vue application. Similar documentation is available in the rdvue-cli _README._

## How to use rdvue-cli

All commands will follow the basic structure:

```
npx rdvue [command]
```

## CLI Options

Run the cli option below for a list of commands and options

| **Option**   | **Description**         |
| ------------ | :---------------------- |
| \--h, --help | Displays the help menu. |

## CLI Commands

RDVue includes the following sub-commands:

| **Command**                       | **Description**                                  |
| --------------------------------- | :----------------------------------------------- |
| [create-project](#create-project) | Scaffold a new rdvue project                     |
| [add](#add)                       | Add a feature to a project                       |
| [plugin](#plugin)                 | Inject a utility to extend project functionality |
| [upgrade](#upgrade)               | Specify the rdvue template version for a project |

* * *

### _create-project_

create-project will scaffold a new project for you, using one of the presets selected from its interactive shell.

Usage
```
$ npx rdvue create-project <options> <project name>
```

Options

| **Option** | **Description**                                                 |
| ---------- | :-------------------------------------------------------------- |
| --mobile   | Uses the rdvue mobile template instead of the standard template |


* * *

### _add_
Adds a feature to the project.

Usage
```
$ npx rdvue add:<feature> <name>
```
Features
* [component](../Components.md)
* [page](../Pages.md)
* [service](../Services.md)
* [store](../Stores.md)


* * *

### _plugin_
Injects a utility to extend the project's functionality

Usage
```
$ npx rdvue plugin:<library>
```

Libraries
* buefy
* [localization](../Localization.md)
* vuetify


* * *

### _upgrade_
Attempts to upgrade the project's rdvue template to the specified version

Usage
```
$ npx rdvue upgrade <version>
```
