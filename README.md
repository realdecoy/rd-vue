<div align="left">
  <br/>
  <a href="https://www.realdecoy.com/jamaica/" title="REALDECOY">
    <img width=400px src="https://www.realdecoy.com/wp-content/uploads/2019/02/Realdecoy-logo-transparent.png" alt="rd logo">
  </a>
  <br/>
</div>

# RDVue [![npm version](https://badge.fury.io/js/rdvue.svg)](https://badge.fury.io/js/rdvue)

[RDVue](https://github.com/realdecoy/rdvue) is an opinionated CLI for generating Vue.js projects. We do so by adopting
a development style guide which enforces strong typing with TypeScript, standardized Component, Layout and Page models,
and a data-layer design promoting unified consumption through Stores and Services.

## Table of Contents

- [Usage](#usage)
- [Options](#options)
- [Documentation](#documentation)


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

## About

The RDVue CLI is the product of RealDecoy's Frontend Practice group. Contributions are welcome! You can help us by reporting or fixing bugs and giving us feedback on new/existing features.
