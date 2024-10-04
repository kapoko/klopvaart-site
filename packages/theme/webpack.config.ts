import path from "node:path";
import defaultConfig from "@wordpress/scripts/config/webpack.config";
const [scriptConfig, moduleConfig] = defaultConfig;

const config = {
  ...scriptConfig,
  entry: {
    core: path.resolve(__dirname, "src/core/index.ts"),
  },
};

export default [config, moduleConfig];
