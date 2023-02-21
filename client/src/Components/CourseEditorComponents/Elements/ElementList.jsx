import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Element from "./Element";
import { useDispatch, useSelector } from "react-redux";
import {
  getScreen,
  deleteElement,
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
        />
      </Stack>
    );
  }
}
