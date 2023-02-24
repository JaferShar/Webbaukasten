import { ThemeProvider } from "@emotion/react";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { setPicture } from "../../features/courseEditor/screenSlice";
import uploadImage from "../../features/upload/CloudinaryUpload";
import { toast } from "react-toastify";

const theme = createTheme({
  palette: {
    neutral: {
      main: "rgba(255, 255, 255, 0.54)",
    },
  },
});
/**
 * This module provides a button to save an image from Pixabay to Cloudinary.
 *
 * @param {*} {
 * item, The item to be saved.
 * handleClose, handles the closing of the component.
 * }
 * @returns button to save Pixabay.
 */
export default function PixabaySaveButton({ item, handleClose }) {
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screenEditor.screen);

  const downloadImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      toast.error("Error downloading image from Pixabay");
    }
  };

  const handleUpload = async () => {
    try {
      const file = await downloadImage(item.largeImageURL);
      const url = await uploadImage(file);
      dispatch(setPicture({ url: url, screenId: screen._id }));
      toast.success("Image uploaded to cloudinary");
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        sx={{ borderRadius: 9 }}
        color="neutral"
        variant="contained"
        onClick={() => {
          handleUpload();
          handleClose();
        }}
        startIcon={<SaveIcon />}
      >
        Hochladen
      </Button>
    </ThemeProvider>
  );
}
