# Native Mobile Setup

Developing native mobile applications with RDVue will require a few adjustments to your environment. It is recommended to follow the installation steps listed in the official [NativeScript Environment Setup](https://docs.nativescript.org/environment-setup.html) guide before proceeding with the RDVue Mobile template.

Once your environment is set up, you can create a new native mobile project by running the following command on the cli:

```shell
npx rdvue create-project <project-name> --mobile
```

Adding the `--mobile` flag to the end of the `create-project` sub-command will tell rdvue to scaffold your project with the [RDVue Mobile Template](https://github.com/realdecoy/rdvue-mobile-template) instead of the standard [RDVue Web Template](https://github.com/realdecoy/rdvue-template).