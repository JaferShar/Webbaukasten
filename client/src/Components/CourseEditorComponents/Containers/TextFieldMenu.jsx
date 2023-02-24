import React, { useState } from "react";
import {
  Button,
  Box
} from "@mui/material";
import TextField from '@mui/material/TextField';

import { useSelector, useDispatch } from "react-redux";
import { setTextField } from "../../../features/courseEditor/screenSlice";
import AddIcon from "@mui/icons-material/Add";

/**
 * This component provides a button that when clicked shows a text field to add text notes in HTML format.
 * 
 * @returns  A button that when clicked shows a text field to add text notes in HTML format.
 */
const TextEditor = () => {
  const [showTextField, setShowTextField] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screenEditor.screen);

  const handleOpen = () => {
    setShowTextField(true);
  };

  const handleClose = () => {
    setShowTextField(false);
  };

  const handleSave = () => {
    console.log(`Text: ${text}`);
    handleClose();
    dispatch(setTextField({ text, screenId: screen._id }));
  };

  return (
    <div>
      {
      // !showTextField ? 
      (
        <Button style={{ border: "1px solid #d9dddd" }} onClick={handleSave}>
          <AddIcon />
          Text hinzufügen
        </Button>
      )
      //  : (
      //   <Box
      //     component="form"
      //     sx={{
      //       '& > :not(style)': { m: 1 },
      //     }}
      //     noValidate
      //     autoComplete="off"
      //   >
      //     <TextField
      //       id="outlined-multiline-static"
      //       label="Text"
      //       multiline
      //       rows={4}
      //       value={text}
      //       onChange={(e) => setText(e.target.value)}
      //       variant="outlined"
      //     />
      //     <Button onClick={handleClose}>Cancel</Button>
      //     <Button onClick={handleSave}>Save</Button>
      //   </Box>
      // )
    }
    </div>
  );
};

export default TextEditor;
