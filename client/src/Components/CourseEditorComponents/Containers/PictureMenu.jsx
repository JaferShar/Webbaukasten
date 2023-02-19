import AddIcon from "@mui/icons-material/Add";
import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPicture } from "../../../features/courseEditor/screenSlice";
import { useState } from "react";

const PictureMenu = () => {
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screenEditor.screen);

  const handleInput = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileUpload = (event) => {
    // check if file is an image and not too big
    // handle error on displaying the image
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    dispatch(setPicture({formData: formData, screenId: screen._id}));
  };

  return (
    <Box>
      <Button
        onClick={handleInput}
        style={{
          border: "1px solid #d9dddd",
        }}
      >
        <AddIcon />
        Bild hochladen
      </Button>
      <input
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </Box>
  );
};

export default PictureMenu;
