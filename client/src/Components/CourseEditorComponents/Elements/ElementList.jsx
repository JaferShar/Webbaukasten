import { useEffect } from "react";
import { Stack } from "@mui/material";
import Element from "./Element";
import { useDispatch, useSelector } from "react-redux";
import { getScreen } from "../../../features/courseEditor/screenSlice";

export default function ElementList() {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.screenEditor.screen.elements);

  // maybe dispatch later to be current
  useEffect(() => {
      //dispatch(getScreen());
  }, [elements]);

  if (!elements || elements.length === 0) {
    return <Stack spacing={2} />;
  } else {
    return (
      <Stack spacing={2}>
        {elements.map((element) => (
          <Element key={element._id} element={element} />
        ))}
      </Stack>
    );
  }
}
