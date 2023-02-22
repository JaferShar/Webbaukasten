import { useState } from "react";
import { Stack } from "@mui/material";
import Element from "./Element";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteElement,
  exchangeElement,
} from "../../../features/courseEditor/screenSlice";
import ElementMenu from "./ElementMenu";

export default function ElementList() {
  const screen = useSelector((state) => state.screenEditor.screen);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const dispatch = useDispatch();

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
        element: { type: "TextField", text: "" },
      })
    );
    handleClose();
  };

  const handleExchangeImage = (file) => {
    dispatch(
      exchangeElement({
        screenId: screen._id,
        prevElementId: selectedElement,
        element: { type: "Image", src: "" },
      })
    );
    handleClose();
  };

  const handleExchangeH5P = (content) => {
    dispatch(
      exchangeElement({
        screenId: screen._id,
        prevElementId: selectedElement,
        element: { type: "H5P", src: content },
      })
    );
    handleClose();
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
