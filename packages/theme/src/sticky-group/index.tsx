import { registerBlockType } from "@wordpress/blocks";
import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

import metadata from "./block.json";

registerBlockType(metadata.name, {
  ...metadata,
  icon: "sort",
  attributes: {},
  edit: ({ attributes, setAttributes }) => {
    return (
      <div {...useBlockProps()}>
        <InnerBlocks />
      </div>
    );
  },
  save: () => {
    const blockProps = useBlockProps.save();
    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <div {...innerBlocksProps} />;
  },
});
