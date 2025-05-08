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
    },
  ],
];

const MenuButton = ({ className }: { className: string }) => {
  return (
    <button className={`hamburger hamburger--chop ${className}`} type="button">
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
      <div
        {...useBlockProps({
          className:
            "max-w-full md:container mx-auto px-4 py-2 md:py-10 justify-end md:justify-start flex items-center",
        })}
      >
        <div className="hidden md:block">
          <InnerBlocks
            allowedBlocks={metadata.allowedBlocks}
            templateLock={"contentOnly"}
            template={TEMPLATE}
          />
        </div>
        <MenuButton className={"md:hidden!"} />
      </div>
    );
  },
  save: () => {
    const blockProps = useBlockProps.save();
    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <div {...innerBlocksProps} />;
  },
});
