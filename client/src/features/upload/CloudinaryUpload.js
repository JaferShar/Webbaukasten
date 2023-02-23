import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPicture } from "../courseEditor/screenSlice";
import { toast } from "react-toastify";

const CloudinaryUpload = async (file) => {
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screenEditor.screen);

  const cloudName = process.env.REACT_APP_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("cloud_name", cloudName);

  try {
    const result = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    dispatch(setPicture({ url: result.data.secure_url, screenId: screen._id }));
  } catch (error) {
    toast.error("Upload failed. Please try again later.");
  }
};

export default CloudinaryUpload;
