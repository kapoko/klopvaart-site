import path from "node:path";

import defaultConfig from "@wordpress/scripts/config/webpack.config.js";
const [scriptConfig, moduleConfig] = defaultConfig;

const config = {
    ...scriptConfig,
    entry: {
        ...scriptConfig.entry(),
        core: path.resolve("./src/core/index.ts"),
        global: path.resolve("./src/global.ts"),
    },
};

export default [config, moduleConfig];
