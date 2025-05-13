import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  PanelColorSettings,
  useBlockProps,
} from "@wordpress/block-editor";
import { PanelBody, CustomSelectControl } from "@wordpress/components";

import { Icon, globe, mapMarker, envelope } from "@wordpress/icons";
const iconMap: Record<string, JSX.Element> = {
  envelope,
  mapMarker,
};

import metadata from "./block.json";

interface Attr {
  icon: string;
  color: string;
}

type IconOption = {
  key: string;
  name: string;
};

registerBlockType<Attr>(metadata.name, {
  ...metadata,
  icon: globe,
  attributes: {
    icon: { type: "string", default: "mapMarker" },
    color: { type: "string" },
  },
  edit: ({ attributes, setAttributes }) => {
    const { icon, color } = attributes;

    return (
      <>
        <InspectorControls>
          <PanelColorSettings
            title={__("Color", "klopvaart")}
            colorSettings={[
              {
                value: color,
                onChange: (value) => setAttributes({ color: value }),
                label: __("Icon color", "klopvaart"),
              },
            ]}
          />
          <PanelBody title={__("Icon", "klopvaart")}>
            <CustomSelectControl
              __next40pxDefaultSize
              label="Icon"
              onChange={(value: { selectedItem: IconOption }) =>
                setAttributes({ icon: value.selectedItem.key })
              }
              options={[
                {
                  key: "mapMarker",
                  name: "Map Marker",
                },
                {
                  key: "envelope",
                  name: "Envelope",
                },
              ]}
              value={attributes.icon}
            />
          </PanelBody>
        </InspectorControls>
        <div {...useBlockProps()}>
          <Icon icon={iconMap[icon]} style={{ fill: color }} />
        </div>
      </>
    );
  },
  save: ({ attributes }) => {
    return (
      <Icon
        {...useBlockProps.save()}
        icon={iconMap[attributes.icon]}
        style={{ fill: attributes.color }}
      />
    );
  },
});
