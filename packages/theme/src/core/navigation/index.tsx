import type { BlockEditProps } from "@wordpress/blocks";
import { addFilter } from "@wordpress/hooks";

import clsx from "clsx";

interface BlockFilterProps extends BlockEditProps<Record<never, never>> {
  name: string;
}

addFilter(
  "editor.BlockListBlock",
  "core/navigation/add-classes",
  (BlockListBlock) => (props: BlockFilterProps) => {
    const { name, className } = props;

    if ("core/navigation" !== name) {
      return <BlockListBlock {...props} />;
    }

    return <BlockListBlock {...props} className={clsx(className, "gap-10")} />;
  },
);
