import React, { Component, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPicture } from "../../../features/courseEditor/screenSlice";

export default function CloudinaryUploadWidget() {
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screenEditor.screen);

  useEffect(() => {
    const cloudName = "dhe2sdssg";
    const uploadPreset = "Kursify_img";

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          dispatch(
            setPicture({ url: result.info.secure_url, screenId: screen._id })
          );
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      () => {
        widget.open();
      },
      false
    );
  }, [dispatch, screen._id]);

  return (
    <Button
      style={{ border: "1px solid #d9dddd" }}
      id='upload_widget'
      className='cloudinary-button'
    >
      <AddIcon />
      Bild hochladen
    </Button>
  );
}
