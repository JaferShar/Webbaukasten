import React, { useCallback, useState } from "react";
import RichTextEditor from "react-rte-17";



export default function PopUpButtonText() {


const rteText = ``;
const [html, set] = useState("");
  const toolbarConfig = {
    
    display: [
      "INLINE_STYLE_BUTTONS",
      "BLOCK_TYPE_BUTTONS",
      "BLOCK_TYPE_DROPDOWN",
      "HISTORY_BUTTONS"
    ],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" }
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: "Normal", style: "unstyled" },
      { label: "Heading Large", style: "header-one" },
      { label: "Heading Medium", style: "header-two" },
      { label: "Heading Small", style: "header-three" }
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" }
    ]
  };

  const [notes, setNotes] = useState(
    RichTextEditor.createValueFromString(rteText, "html")
  );


  const onValueChangeCallback = useCallback((value) => {
    const toHtml = value.toString("html");
    setNotes(value);
    console.log(toHtml);
    set(toHtml);
    // onValueChange(value.toString('html'));
  }, []);

  return (
    <RichTextEditor
    value={notes}
    onChange={onValueChangeCallback}
    data-test="notes"
    toolbarConfig={toolbarConfig}
  />
  );
}

