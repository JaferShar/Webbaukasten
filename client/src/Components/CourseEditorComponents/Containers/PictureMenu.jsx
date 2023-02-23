import React, { useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPicture } from "../../../features/courseEditor/screenSlice";
import { toast } from "react-toastify";

/**
 * This component provides a button to open Cloudinary upload widget.
 * Upon successful upload, the uploaded image is saved to the current screen in the Redux store.
 *
 * @returns button with a popup to upload images
 */
export default function CloudinaryUploadWidget() {
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screenEditor.screen);
  const { REACT_APP_CLOUD_NAME, REACT_APP_UPLOAD_PRESET } = process.env;
  // Memoize Cloudinary upload widget creation.
  const widget = useCallback(() => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: REACT_APP_CLOUD_NAME,
        uploadPreset: REACT_APP_UPLOAD_PRESET,
        sources: [
          "local",
          "url",
          "camera",
          "image_search",
          "google_drive",
          "dropbox",
        ],
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          try {
            dispatch(setPicture({ url: result.info.secure_url, screenId: screen._id }));
          } catch (error) {
            toast.error("Failed to upload image");
          }
        }
      }
    );
  }, [REACT_APP_CLOUD_NAME, REACT_APP_UPLOAD_PRESET, dispatch, screen._id]);


  // Use ref hook to attach Cloudinary upload widget to button click event.
  const buttonRef = useCallback(
    (node) => {
      if (node !== null) {
        node.addEventListener("click", () => {
          widget.open();
        });
      }
    },
    [widget]
  );

  return (
    <Button
      style={{ border: "1px solid #d9dddd" }}
      ref={buttonRef}
      className='cloudinary-button'
    >
      <AddIcon />
      Bild hochladen
    </Button>
  );
}
