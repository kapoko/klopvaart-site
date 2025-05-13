import { registerBlockType } from "@wordpress/blocks";
import {
  PanelBody,
  RadioControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import {
  PanelColorSettings,
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { siteLogo } from "@wordpress/icons";

import metadata from "./block.json";

import LogoPlain from "./klopvaartLogo";
import LogoText from "./klopvaartLogoText";

interface Attr {
  color: string;
  size: string;
  version: string;
}

const classNames: { [index: string]: string } = {
  small: "w-20 md:w-25 xl:w-30",
  big: "w-30 md:w-40 xl:w-50",
};

registerBlockType<Attr>(metadata.name, {
  ...metadata,
  icon: siteLogo,
  attributes: {
    color: { type: "string" },
    size: { type: "string", default: "big" },
    version: { type: "string", default: "image" },
  },
  edit: ({ attributes, setAttributes }) => {
    const { color, size, version } = attributes;
    const Logo = version === "image" ? LogoPlain : LogoText;

    return (
      <>
        <InspectorControls>
          <PanelColorSettings
            title={__("Color", "klopvaart")}
            colorSettings={[
              {
                value: color,
                onChange: (value) => setAttributes({ color: value }),
                label: __("Logo color", "klopvaart"),
              },
            ]}
          />
          <PanelBody title={__("Settings", "klopvaart")}>
            <ToggleGroupControl
              label={__("Size", "klopvaart")}
              value={size}
              onChange={(value) => setAttributes({ size: value as string })}
              isBlock
              __nextHasNoMarginBottom
            >
              <ToggleGroupControlOption
                value="small"
                label={__("Small", "klopvaart")}
              />
              <ToggleGroupControlOption
                value="big"
                label={__("Big", "klopvaart")}
              />
            </ToggleGroupControl>
            <RadioControl
              label={__("Logo version", "klopvaart")}
              selected={version}
              options={[
                { label: __("Logo", "klopvaart"), value: "image" },
                { label: __("Logo With Text", "klopvaart"), value: "withText" },
              ]}
              onChange={(value) => setAttributes({ version: value })}
            />
          </PanelBody>
        </InspectorControls>

        <div {...useBlockProps({ className: classNames[size] })}>
          <Logo className="w-full" color={color} />
        </div>
      </>
    );
  },
  save: ({ attributes }) => {
    const Logo = attributes.version === "image" ? LogoPlain : LogoText;

    return (
      <div {...useBlockProps.save({ className: classNames[attributes.size] })}>
        <Logo className="w-full" color={attributes.color} />
      </div>
    );
  },
});
