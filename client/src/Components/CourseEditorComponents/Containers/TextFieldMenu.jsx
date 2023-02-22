import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PopUpButtonText from "./TextContainer";
import AddIcon from "@mui/icons-material/Add";

const TextEditor = () => {
  const [open, setOpen] = useState(false);
  const [text] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log(`Text: ${text}`);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Text Editor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the text below and click Save to submit changes.
          </DialogContentText>
          <PopUpButtonText />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      <Button
        style={{ border: "1px solid #d9dddd" }}
        variant="contained"
        onClick={handleOpen}
      >
        <AddIcon />
        Text hinzufügen
      </Button>
    </div>
  );
};

export default TextEditor;
