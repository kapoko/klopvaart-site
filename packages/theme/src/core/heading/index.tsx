import clsx from "clsx";
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, ToggleControl } from "@wordpress/components";
import type { BlockEditPropsWithName } from "@wordpress/hooks";
import { addFilter } from "@wordpress/hooks";

import "./style.css";
import "./editor.css";

interface Attr {
    bigPageTitle: boolean;
}

addFilter(
    "blocks.registerBlockType",
    "klopvaart/core-spacer/add-attributes",
    (settings) => {
        if ("core/heading" !== settings.name) {
            return settings;
        }

        const newSettings = {
            ...settings,
            attributes: {
                ...settings.attributes,
                bigPageTitle: {
                    type: "boolean",
                },
            },
        };

        return newSettings;
    },
);

addFilter(
    "editor.BlockEdit",
    "klopvaart/core-heading/add-inspector-controls",
    (BlockEdit) => (props: BlockEditPropsWithName<Attr>) => {
        if (props.name !== "core/heading") {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const { bigPageTitle } = attributes;
        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody
                        title={__("Klopvaart Settings", "klopvaart")}
                        initialOpen={true}
                    >
                        <PanelRow>
                            <ToggleControl
                                label={__("Big page title", "klopvaart")}
                                checked={bigPageTitle}
                                onChange={() => {
                                    setAttributes({
                                        bigPageTitle: !bigPageTitle,
                                    });
                                }}
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
            </>
        );
    },
);

addFilter(
    "editor.BlockListBlock",
    "klopvaart/core-heading/add-classes",
    (BlockListBlock) => (props: BlockEditPropsWithName<Attr>) => {
        const { name, attributes, className } = props;

        if ("core/heading" !== name || !attributes.bigPageTitle) {
            return <BlockListBlock {...props} />;
        }

        const classes = clsx(className, "big-page-title");

        return <BlockListBlock {...props} className={classes} />;
    },
);
