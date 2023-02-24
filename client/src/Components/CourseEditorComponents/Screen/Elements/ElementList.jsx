import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import Element from "./Element";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteElement,
  exchangeElement,
  getScreen,
} from "../../../../features/courseEditor/screenSlice";
import ElementMenu from "./ElementMenu";
import uploadCloudinary from "../../../../features/upload/CloudinaryUpload";
import { toast } from "react-toastify";

/**
 * This module provides a list of elements within the screen editor.
 * @returns A list of elements.
 */
export default function ElementList() {
  const screen = useSelector((state) => state.screenEditor.screen);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (reload === true) {
      dispatch(getScreen(screen._id));
      setReload(false);
    }
  }, [reload, dispatch, screen._id]);

  /**
   * Opens the context menu on right-click.
   * @param {*} event 
   * @param {*} elementId The element selected
   */
  const handleContextMenu = (event, elementId) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedElement(elementId);
  };

  /**
   * Closes the context menu.
   */
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedElement(null);
  };

  /**
   * Deletes the selected element.
   */
  const handleDelete = () => {
    dispatch(
      deleteElement({ screenId: screen._id, elementId: selectedElement })
    );
    handleClose();
  };

  /**
   * Exchanges the selected element with a text field.
   */
  const handleExchangeTextField = () => {
    dispatch(
      exchangeElement({
        screenId: screen._id,
        prevElementId: selectedElement,
        element: { elementType: "TextField", text: "" },
      })
    );
    handleClose();
  };

  /**
   * Exchange an element with a new image.
   * @param {*} file 
   */
  const handleExchangeImage = async (file) => {
    try {
      const url = await uploadCloudinary(file);
      dispatch(
        exchangeElement({
          screenId: screen._id,
          prevElementId: selectedElement,
          element: { elementType: "Picture", url: url },
        })
      );
      setReload(true);
      toast.success("Image uploaded to cloudinary");
    } catch (error) {
      toast.error(error.message);
    } finally {
      handleClose();
    }
  };

  /**
   * Exchange an element with a new H5P.
   * @param {Exchange} content 
   */
  const handleExchangeH5P = (content) => {
    dispatch(
      exchangeElement({
        screenId: screen._id,
        prevElementId: selectedElement,
        element: { elementType: "H5P", content: content },
      })
    );
    handleClose();
    // reload because the elementId has not changed, thus the element is not reloaded
    setReload(true);
  };

  // If there are no elements, return an empty stack.
  if (!screen.elements || screen.elements.length === 0) {
    return <Stack spacing={2} />;
  } else {
    return (
      <Stack spacing={2}>
        {screen.elements.map((element) => (
          <Element
            key={element._id}
            element={element}
            handleContextMenu={handleContextMenu}
            style={{ cursor: "context-menu" }}
          />
        ))}
        <ElementMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleDelete={handleDelete}
          handleExchangeTextField={handleExchangeTextField}
          handleExchangeImage={handleExchangeImage}
          handleExchangeH5P={handleExchangeH5P}
        />
      </Stack>
    );
  }
}