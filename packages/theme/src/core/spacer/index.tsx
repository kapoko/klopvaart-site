import clsx from "clsx";
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, ToggleControl } from "@wordpress/components";
import type { BlockEditPropsWithName } from "@wordpress/hooks";
import { addFilter } from "@wordpress/hooks";

interface Attr {
    hideOnMobile: boolean;
}

addFilter(
    "blocks.registerBlockType",
    "klopvaart/core-spacer/add-attributes",
    (settings) => {
        if ("core/spacer" !== settings.name) {
            return settings;
        }

        const newSettings = {
            ...settings,
            attributes: {
                ...settings.attributes,
                hideOnMobile: {
                    type: "boolean",
                },
            },
        };

        return newSettings;
    },
);

addFilter(
    "editor.BlockEdit",
    "klopvaart/core-spacer/add-inspector-controls",
    (BlockEdit) => (props: BlockEditPropsWithName<Attr>) => {
        if (props.name !== "core/spacer") {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const { hideOnMobile } = attributes;
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
                                label={__("Hidden on mobile", "klopvaart")}
                                checked={hideOnMobile}
                                onChange={() => {
                                    setAttributes({
                                        hideOnMobile: !hideOnMobile,
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
    "klopvaart/core-spacer/add-classes",
    (BlockListBlock) => (props: BlockEditPropsWithName<Attr>) => {
        const { name, attributes, className } = props;

        if ("core/columns" !== name || !attributes.hideOnMobile) {
            return <BlockListBlock {...props} />;
        }

        const classes = clsx(className, "hidden md:block");

        return <BlockListBlock {...props} className={classes} />;
    },
);
