import { Options } from "./types";
import { execute } from "./worker";

class IconWebpackPlugin {

    private options: Options;

    constructor(options: Options) {
        this.options = options;
    }

    // This apply method is called once by the webpack compiler while installing the plugin.
    protected async apply() {
        // based on the value of the disable parameter the user can toggle the plugin functionality
        (this.options.disable) ? void (0) : await execute(this.options.isProd);
    }
}

export {
    IconWebpackPlugin as default,
    IconWebpackPlugin,
};
