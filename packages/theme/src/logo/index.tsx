import { registerBlockType } from "@wordpress/blocks";
import {
  PanelBody,
  RadioControl,
  ToggleControl,
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
import BaseControl, {
  VisualLabel,
} from "@wordpress/components/build-types/base-control";

interface Attr {
  color: string;
  size: string;
  version: string;
  linkEnabled: boolean;
}

const classNames: { [index: string]: string } = {
  small: "w-30",
  big: "w-50",
};

registerBlockType<Attr>(metadata.name, {
  ...metadata,
  icon: siteLogo,
  attributes: {
    color: { type: "string" },
    size: { type: "string", default: "big" },
    version: { type: "string" },
    linkEnabled: { type: "boolean" },
  },
  edit: ({ attributes, setAttributes }) => {
    const { color, size, version, linkEnabled } = attributes;
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
            <ToggleControl
              __nextHasNoMarginBottom
              label={__("Enable link", "klopvaart")}
              help={__(
                "Makes the logo clickable, linking to the home page",
                "klopvaart",
              )}
              checked={linkEnabled}
              onChange={(value) => setAttributes({ linkEnabled: value })}
            />
          </PanelBody>
        </InspectorControls>

        <div {...useBlockProps({ className: classNames[size] })}>
          <Logo className="w-full" color={color} />
        </div>
      </>
    );
  },
});
