import UploadWidget from "../../../features/upload/UploadWidget";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import {
  setPicture,
  updateScreen,
} from "../../../features/courseEditor/screenSlice";
import { toast } from "react-toastify";
import { store } from "../../../app/store";

/**
 * This component provides a button that opens a cloudinary upload widget which provides
 * some methods to upload pictures to the cloudinary database.
 * The uploaded picture is stored in the url field of the screen.
 * @returns An upload widget for uploading pictures to the cloudinary database.
 */
export default function PictureMenu() {
  const dispatch = useDispatch();

  /**
   * This function handles the upload of a picture to the cloudinary database.
   * @param {*} error Any error that occured during the upload to cloudinary.
   * @param {*} result Contains information about the uploaded picture.
   * @param {*} widget The cloudinary widget that is used to upload the picture.
   * @returns
   */
  async function handleOnUpload(error, result, widget) {
    const screen = store.getState().screenEditor.screen;
    await dispatch(
      updateScreen({ screenId: screen._id, elements: screen.elements })
    );

    // If an error occured during the upload, the widget is closed and an error message is displayed.
    if (error) {
      toast.error(error.statusText);
      widget.close({
        quiet: true,
      });
      return;
    } else if (result.event === "success") {
      // If the upload was successful, the picture url is stored in the url field of the screen.
      try {
        dispatch(
          setPicture({ url: result.info.secure_url, screenId: screen._id })
        );
      } catch (error) {
        // If the picture url could not be stored in the url field of the screen,
        // the widget is closed and an error message is displayed.
        toast.error("Bild konnte nicht hochgeladen werden.");
        widget.close({
          quiet: true,
        });
        return;
      }
    }
  }
  // The upload widget is returned.
  return (
    <div>
      <UploadWidget onUpload={handleOnUpload}>
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <Button
              onClick={handleOnClick}
              style={{ border: "1px solid #d9dddd" }}
            >
              <AddIcon />
              Bild hochladen
            </Button>
          );
        }}
      </UploadWidget>
    </div>
  );
}
