import { registerBlockVariation } from "@wordpress/blocks";

import metadata from "./block.json";

registerBlockVariation("core/heading", {
  ...metadata,
  icon: "update",
  isActive: ["textColor"],
});
