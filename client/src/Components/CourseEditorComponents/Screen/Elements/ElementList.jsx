import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import Element from "./Element";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteElement,
  exchangeElement,
  getScreen,
  scaleImage,
  updateScreen,
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
  const [elementType, setElementType] = useState(null);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  const validH5PLink = new RegExp("https://h5p.org/h5p/embed/[0-9]+");

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
  const handleContextMenu = (event, element) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedElement(element);
    setElementType(element.elementType);
  };

  /**
   * Closes the context menu.
   */
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedElement(null);
    setElementType(null);
  };

  /**
   * Deletes the selected element.
   */
  const handleDelete = () => {
    dispatch(
      deleteElement({ screenId: screen._id, elementId: selectedElement._id })
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
        prevElementId: selectedElement._id,
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
          prevElementId: selectedElement._id,
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
    const h5pURL = String(content.match(validH5PLink));
    if (!h5pURL || h5pURL === "null") {
      invalidLinkNotify();
    } else {
      dispatch(
        exchangeElement({
          screenId: screen._id,
          prevElementId: selectedElement._id,
          element: { elementType: "H5P", content: h5pURL },
        })
      );
    }
    handleClose();
    // reload because the elementId has not changed, thus the element is not reloaded
    setReload(true);
  };

  const invalidLinkNotify = () => {
    toast.error("Kein gültiger Link", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleScaleImage = (width) => {
    const url = selectedElement.url;
    if (width === 1 || width === 2) {
      width += ".0";
    }
    const regex = /^(.*?\/upload\/)(w_0\.[0-9]|[01],c_scale\/)(.*)$/;
    var newUrl = "";

    if (regex.test(url)) {
      const [, baseUrl, , path] = url.match(regex);
      newUrl = `${baseUrl}w_${width}${path}`;
    } else {
      const regex = /^(.*?\/upload\/)(.*)$/;
      const [, baseUrl, path] = url.match(regex);
      newUrl = baseUrl + "w_" + width + ",c_scale/" + path;
    }
    dispatch(
      scaleImage({
        screen: screen,
        elementId: selectedElement._id,
        url: newUrl,
      })
    );
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
            handleContextMenu={(event) => {
              handleContextMenu(event, element);
            }}
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
          handleScaleImage={handleScaleImage}
          selectedElement={selectedElement}
          elementType={elementType}
        />
      </Stack>
    );
  }
}
