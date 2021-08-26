# Getting Started

[RDVue](https://github.com/realdecoy/rdvue) is an opinionated CLI for generating Vue.js projects. We do so by adopting
a development style guide which enforces strong typing with TypeScript, standardized Component, Layout and Page models,
and a data-layer design promoting unified consumption through Stores and Services.

## Usage

```bash
npx rdvue [command]
```

The help menu can be accessed with the command:

```bash
rdvue --help
```

## Options

```txt
npx rdvue <action> [<feature>|<plugin>|<plugin group>] [<project-name>|<feature-name>]

Actions:
  generate | g  -  Creates new Feature.
  add           -  Add a Plugin to a project.
  add-group     -  Add a Plugin to a project by selecting
                   from preset groups.


Features:       -  Utilities to create repeatable project elements.
  project       -  Scaffold a new RDVue project.
  component     -  Generate a new Component module.
  page          -  Generate a new Page module.
  service       -  Generate a new Service module.layer
  layout        -  Generate a new Page Layout.

Plugin Groups:  -  Choose a plugin from preset groupings.
  auth          -  Provides plugins which generate pages, components 
                   and data models to support common authentication 
                   scenarios.

  ui            -  Provides plugins which add UI libraries or 
                   functionalities.
Plugins:
  buefy         -  Add Buefy support to an existing project.
  vuetify       -  Add Vuetify support to an existing project.
  localization  -  Add i18n localization support to an existing project.

Options:
  --help | -h   -  Show help information.
```


## Validate Installation

We can confirm the successful installation of RDvue in three simple steps:

### Step 1: Create a project

```
npx rdvue generate project <project_name>
```

Replace `<project_name>` with the actual name of your project.

Generated folders are named in kebab-case.

### Step 2: Install project dependencies

```
cd <project_name>
npm install
```

### Step 3: Serve project

```
npm run serve
```

The project will be served at [http://localhost:8080/](http://localhost:8080/) by default. This information will also be printed out in your terminal. Visiting the link the app is served on will display a default page which was created on project creation.

[Continue - Folder Structure](Notable-Files.md#Notable-Files-&-Directories)