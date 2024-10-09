import clsx from "clsx";
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, ToggleControl } from "@wordpress/components";
import type { BlockEditPropsWithName } from "@wordpress/hooks";
import { addFilter } from "@wordpress/hooks";

import "./style.css";

interface Attr {
  restrictedFirstColumn: boolean;
}

addFilter(
  "blocks.registerBlockType",
  "klopvaart/core-columns/add-attributes",
  (settings) => {
    if ("core/columns" !== settings.name) {
      return settings;
    }

    const newSettings = {
      ...settings,
      attributes: {
        ...settings.attributes,
        restrictedFirstColumn: {
          type: "boolean",
        },
      },
    };

    return newSettings;
  },
);

addFilter(
  "editor.BlockEdit",
  "klopvaart/core-columns/add-inspector-controls",
  (BlockEdit) => (props: BlockEditPropsWithName<Attr>) => {
    if (props.name !== "core/columns") {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes } = props;
    const { restrictedFirstColumn } = attributes;
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
                label={__("Restrict left column to content size", "klopvaart")}
                checked={restrictedFirstColumn}
                onChange={() => {
                  setAttributes({
                    restrictedFirstColumn: !restrictedFirstColumn,
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
  "klopvaart/core-columns/add-classes",
  (BlockListBlock) => {
    return (props: BlockEditPropsWithName<Attr>) => {
      const { name, attributes, className } = props;

      if ("core/columns" !== name || !attributes.restrictedFirstColumn) {
        return <BlockListBlock {...props} />;
      }

      const classes = clsx(className, "has-restricted-first-column");

      return <BlockListBlock {...props} className={classes} />;
    };
  },
);
