import { registerBlockType } from "@wordpress/blocks";
import type { Template } from "@wordpress/blocks";
import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

import metadata from "./block.json";

const TEMPLATE: Template[] = [
  [
    "core/group",
    {
      layout: { type: "constrained" },
      backgroundColor: "contrast",
      textColor: "white",
      className: "py-34",
    },
    [
      [
        "core/columns",
        {},
        [
          ["core/column", {}, [["core/paragraph", { placeholder: "joe" }]]],
          ["core/column", {}, [["core/paragraph", { placeholder: "joe2" }]]],
          ["core/column", {}, [["core/paragraph", { placeholder: "joe3" }]]],
        ],
      ],
    ],
  ],
];

registerBlockType(metadata.name, {
  ...metadata,
  icon: "columns",
  attributes: {},
  edit: () => {
    const blockProps = useBlockProps();
    const className = `${blockProps.className} py-34`;

    return (
      <div {...blockProps} className={className}>
        <InnerBlocks template={TEMPLATE} templateLock="contentOnly" />
      </div>
    );
  },
  save: () => {
    const blockProps = useBlockProps.save();
    return <div {...useInnerBlocksProps.save(blockProps)} />;
  },
});
