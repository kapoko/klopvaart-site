/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";

import json from "./block.json";
const { name } = json;

import "./style.css";
import "./editor.css";

const blockStyle = {
  // backgroundColor: "#ff0",
  color: "#030",
  padding: "20px",
};

// Register the block
registerBlockType(name, {
  edit: (props) => {
    const {
      attributes: { content, textinput },
      setAttributes,
    } = props;

    const blockProps = useBlockProps({ style: blockStyle });

    const onChangeContent = (newContent) => {
      setAttributes({ content: newContent });
    };

    const onChangeTextInput = (newTextInput) => {
      setAttributes({ textinput: newTextInput.target.value });
    };

    return (
      <div {...blockProps}>
        <RichText
          onChange={onChangeContent}
          value={content}
          tagName="h1"
          className="text-5xl"
          allowedFormats={[]}
        />
        <input type="text" value={textinput} onChange={onChangeTextInput} />
      </div>
    );
  },
  save: (props) => {
    const {
      attributes: { content, textinput },
    } = props;
    const blockProps = useBlockProps.save({ style: blockStyle });

    return (
      <div {...blockProps}>
        <RichText.Content tagName="h1" className="text-6xl" value={content} />
        <span className="text-input">{textinput}</span>
      </div>
    );
  },
});
