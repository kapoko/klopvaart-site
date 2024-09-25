import { registerBlockType } from "@wordpress/blocks";
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

import metadata from "./block.json";

import "./style.css";

interface Attr {
    showStartingYear: boolean;
    startingYear: string;
}

registerBlockType<Attr>(metadata.name, {
    ...metadata,
    icon: "update",
    attributes: {
        showStartingYear: {
            type: "boolean",
        },
        startingYear: {
            type: "string",
        },
    },
    example: {},
    edit: ({ attributes, setAttributes }) => {
        const currentYear = new Date().getFullYear().toString();
        const { showStartingYear, startingYear } = attributes;

        let displayDate: string;

        if (showStartingYear && startingYear) {
            displayDate = `${startingYear} - ${currentYear}`;
        } else {
            displayDate = currentYear;
        }

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__("Settings", "test")}>
                        <ToggleControl
                            checked={!!showStartingYear}
                            label={__("Show starting year", "test")}
                            onChange={() =>
                                setAttributes({
                                    showStartingYear: !showStartingYear,
                                })
                            }
                        />
                        {showStartingYear && (
                            <TextControl
                                label={__("Starting year", "test")}
                                value={startingYear || ""}
                                onChange={(value) => setAttributes({ startingYear: value })}
                            />
                        )}
                    </PanelBody>
                </InspectorControls>
                <p {...useBlockProps({ className: "text-6xl" })}>© {displayDate}</p>
            </>
        );
    },
});
