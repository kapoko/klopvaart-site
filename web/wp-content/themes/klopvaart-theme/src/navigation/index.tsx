import { registerBlockType } from "@wordpress/blocks";
import type { Template } from "@wordpress/blocks";
import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

import "./style.scss";

import metadata from "./block.json";

const TEMPLATE: Template[] = [
  [
    "core/navigation",
    {
      overlayMenu: "never",
      style: {
        spacing: {
          blockGap: "var:preset|spacing|60",
        },
      },
    },
  ],
];

const MenuButton = () => {
  return (
    <button className="hamburger hamburger--chop" type="button">
      <div className="inner">
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>
    </button>
  );
};

registerBlockType(metadata.name, {
  ...metadata,
  icon: "admin-site-alt2",
  attributes: {},
  edit: () => {
    return (
      <div {...useBlockProps()}>
        <MenuButton />
        <InnerBlocks
          allowedBlocks={metadata.allowedBlocks}
          templateLock={"contentOnly"}
          template={TEMPLATE}
        />
      </div>
    );
  },
  save: () => {
    const blockProps = useBlockProps.save();
    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <div {...innerBlocksProps} />;
  },
});
