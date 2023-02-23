import React, { useCallback, useState } from "react";
import RichTextEditor from "react-rte-17";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setTextField } from "../../../features/courseEditor/screenSlice";
import AddIcon from "@mui/icons-material/Add";

const TextEditor = () => {
  const [open, setOpen] = useState(false);
  const [text] = useState("");
  const [html, setHtml] = useState("");
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screenEditor.screen);

  const toolbarConfig = {
    display: [
      "INLINE_STYLE_BUTTONS",
      "BLOCK_TYPE_BUTTONS",
      "BLOCK_TYPE_DROPDOWN",
      "HISTORY_BUTTONS",
    ],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: "Normal", style: "unstyled" },
      { label: "Heading Large", style: "header-one" },
      { label: "Heading Medium", style: "header-two" },
      { label: "Heading Small", style: "header-three" },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
    ],
  };

  const [notes, setNotes] = useState(
    RichTextEditor.createValueFromString(text, "html")
  );  

  const onValueChangeCallback = useCallback((value) => {
    const toHtml = value.toString("html");
    setNotes(value);
    setHtml(toHtml);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const htmlString = notes.toString("html");
    console.log(`Text: ${htmlString}`);
    handleClose();
    dispatch(setTextField({ text: htmlString, screenId: screen._id }));
  };

  
  const cleanText = (text) => {
    const regex = /(<([^>]+)>)/gi;
    const htmlEntities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
    };
    return text.replace(regex, "").replace(/[&<>"'\/]/g, (match) => htmlEntities[match]);
  };
  

  <RichTextEditor
  value={notes}
  onChange={onValueChangeCallback}
  data-test="notes"
  toolbarConfig={toolbarConfig}
  blockStyleFn={() => ({})}
/>


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Text Editor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the text below and click Save to submit changes.
          </DialogContentText>
          <RichTextEditor
            value={notes}
            onChange={onValueChangeCallback}
            data-test="notes"
            toolbarConfig={toolbarConfig}
            customStyleMap={{
              'paragraph': {
                margin: 0,
                padding: 0,
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      <Button style={{ border: "1px solid #d9dddd" }} onClick={handleOpen}>
        <AddIcon />
        Text hinzufügen
     
        </Button>
      </div>
   
  );
};

export default TextEditor;
