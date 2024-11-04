import clsx from "clsx";
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, ToggleControl } from "@wordpress/components";
import type { BlockEditPropsWithName } from "@wordpress/hooks";
import { addFilter } from "@wordpress/hooks";

interface Attr {
  makeSticky: boolean;
}

addFilter(
  "blocks.registerBlockType",
  "klopvaart/core-column/add-attributes",
  (settings) => {
    if ("core/column" !== settings.name) {
      return settings;
    }

    const newSettings = {
      ...settings,
      attributes: {
        ...settings.attributes,
        makeSticky: {
          type: "boolean",
        },
      },
    };

    return newSettings;
  },
);

addFilter(
  "editor.BlockEdit",
  "klopvaart/core-column/add-inspector-controls",
  (BlockEdit) => (props: BlockEditPropsWithName<Attr>) => {
    if (props.name !== "core/column") {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes } = props;
    const { makeSticky } = attributes;

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
                label={__("Make column sticky", "klopvaart")}
                checked={makeSticky}
                onChange={() => {
                  setAttributes({
                    makeSticky: !makeSticky,
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
  "klopvaart/core-column/add-classes",
  (BlockListBlock) => (props: BlockEditPropsWithName<Attr>) => {
    const { name, attributes, className } = props;

    if ("core/column" !== name || !attributes.makeSticky) {
      return <BlockListBlock {...props} />;
    }

    const classes = clsx(className, "sticky");

    return <BlockListBlock {...props} className={classes} />;
  },
);
