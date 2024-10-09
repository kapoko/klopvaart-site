import type { BlockEditPropsWithName } from "@wordpress/hooks";
import { addFilter } from "@wordpress/hooks";

import clsx from "clsx";

addFilter(
  "editor.BlockListBlock",
  "core/navigation/add-classes",
  (BlockListBlock) => (props: BlockEditPropsWithName) => {
    const { name, className } = props;

    if ("core/navigation" !== name) {
      return <BlockListBlock {...props} />;
    }

    return <BlockListBlock {...props} className={clsx(className, "gap-10")} />;
  },
);
