import { registerBlockVariation } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

const className = "bg-slate-300";

registerBlockVariation("core/group", {
  name: "blue",
  title: __("Blue Group", "klopvaart"),
  attributes: {
    className,
    style: {
      position: {
        type: "sticky",
      },
    },
  },
  isDefault: true,
  isActive: ["style.position.type", "className"],
  //isActive: (blockAttributes) => {
  //  return (
  //    blockAttributes.style &&
  //    blockAttributes.style.position &&
  //    blockAttributes.style.position.type === "sticky"
  //  );
  //},
  //isActive: (blockAttributes) =>
  //  blockAttributes.style.position?.type === "sticky",
});
