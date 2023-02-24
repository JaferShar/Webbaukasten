import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPicture } from "../../../features/courseEditor/screenSlice";

/**
 * This method handles the logic for uploading and dispatching a picture to backend.
 * @param {*} dispatch 
 * @param {*} screen 
 * @returns 
 */
const handleUploadSuccess = (dispatch, screen) => (error, result) => {
  if (!error && result && result.event === "success") {
    dispatch(
      setPicture({ url: result.info.secure_url, screenId: screen._id })
    );
  } else if (error) {
    console.error(error);
  }
};

/**
 * This Module is responsible for displaying the Cloudinary Upload Widget.
 * @returns The Cloudinary Upload Widget
 */
export default function CloudinaryUploadWidget() {
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screenEditor.screen);
  const cloudName = process.env.REACT_APP_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      sources: [
        "local",
        "url",
        "camera",
        "image_search",
        "google_drive",
        "dropbox",
      ],
      googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      searchByRights: true,
    },
    handleUploadSuccess(dispatch, screen)
  );

  useEffect(() => {
    const handleClick = () => {
      widget.open();
    };

    document.getElementById("upload_widget").addEventListener("click", handleClick);

    return () => {
      document.getElementById("upload_widget").removeEventListener("click", handleClick);
    };
  }, [widget]);

  return (
    <Button
      style={{ border: "1px solid #d9dddd" }}
      id="upload_widget"
      className="cloudinary-button"
    >
      <AddIcon />
      Bild hochladen
    </Button>
  );
}
