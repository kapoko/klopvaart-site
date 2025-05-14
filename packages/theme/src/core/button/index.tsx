import type { BlockEditPropsWithName } from "@wordpress/hooks";
import { addFilter } from "@wordpress/hooks";

import clsx from "clsx";

import "./style.css";

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
