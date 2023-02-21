import { useEffect } from "react";
import { Stack } from "@mui/material";
import Element from "./Element";
import { useDispatch, useSelector } from "react-redux";
import { getScreen } from "../../../features/courseEditor/screenSlice";

export default function ElementList() {
  const elements = useSelector((state) => state.screenEditor.screen.elements);

  const handleContextMenu = (event, elementId) => {
    console.log("context menu", elementId);
    event.preventDefault();
  };

  if (!elements || elements.length === 0) {
    return <Stack spacing={2} />;
  } else {
    return (
      <Stack spacing={2}>
        {elements.map((element) => (
          <Element
            key={element._id}
            element={element}
            handleContextMenu={handleContextMenu}
            style={{ cursor: "context-menu" }}
          />
        ))}
      </Stack>
    );
  }
}
