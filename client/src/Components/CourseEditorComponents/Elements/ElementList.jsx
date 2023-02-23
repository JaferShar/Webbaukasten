import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import Element from "./Element";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteElement,
  exchangeElement,
  getScreen,
} from "../../../features/courseEditor/screenSlice";
import ElementMenu from "./ElementMenu";
import uploadCloudinary from '../../../features/upload/CloudinaryUpload'

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

  const handleContextMenu = (event, elementId) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedElement(elementId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedElement(null);
  };

  const handleDelete = () => {
    dispatch(
      deleteElement({ screenId: screen._id, elementId: selectedElement })
    );
    handleClose();
  };

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

  const handleExchangeImage = async (file) => {
    const url = await uploadCloudinary(file);
    dispatch(
      exchangeElement({
        screenId: screen._id,
        prevElementId: selectedElement,
        element: { elementType: "Picture", url: url },
      })
    );
    handleClose();
  };

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
