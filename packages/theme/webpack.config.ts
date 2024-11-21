import path from "node:path";
import { fileURLToPath } from "node:url";

import defaultConfig from "@wordpress/scripts/config/webpack.config.js";
const [scriptConfig, moduleConfig] = defaultConfig;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  ...scriptConfig,
  entry: {
    ...scriptConfig.entry(),
    core: path.resolve(__dirname, "src/core/index.ts"),
    global: path.resolve(__dirname, "src/global.ts"),
  },
};

export default [config, moduleConfig];
