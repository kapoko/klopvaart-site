import type { BlockEditPropsWithName, getSaveElement } from "@wordpress/hooks";
import { addFilter } from "@wordpress/hooks";
import { createElement } from "@wordpress/element";

import clsx from "clsx";

import "./style.css";

//addFilter(
//  "editor.BlockListBlock",
//  "core/block/add-classes",
//  (BlockListBlock) => (props: BlockEditPropsWithName<Attr>) => {
//    const { name, setAttributes } = props;
//    if ("core/button" !== name) {
//      return <BlockListBlock {...props} />;
//    }
//
//    console.log(BlockListBlock);
//    setAttributes({ className: "bg-slate-500" });
//
//    return <BlockListBlock {...props} />;
//  },
//);
//

//addFilter(
//  "blocks.getSaveElement",
//  "custom/button-extend/save",
//  (element, blockType, attributes) => {
//    if (blockType.name !== "core/button") {
//      return element;
//    }
//
//    const buttonText = element.props.children;
//
//    return createElement(
//      "a",
//      { ...element.props },
//      createElement("span", { className: "joe" }, "A" + buttonText),
//    );
//  },
//);
//

addFilter(
  "editor.BlockListBlock",
  "enable-button-icons/add-classes",
  (BlockListBlock) => (props: BlockEditPropsWithName) => {
    const { name, className } = props;

    if ("core/button" !== name) {
      return <BlockListBlock {...props} />;
    }

    return (
      <BlockListBlock
        {...props}
        className={clsx(className, "klopvaart-button")}
      />
    );
  },
);

console.log("HI from core");
