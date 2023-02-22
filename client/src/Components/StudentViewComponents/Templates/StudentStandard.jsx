import { Stack } from "@mui/material";
import Element from "../Element";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function StudentStandard() {
    const studentScreen = useSelector(
        (state) => state.studentScreen
    );

  const dispatch = useDispatch();

  useEffect (() => {
    }, [studentScreen.elements])

  if (!studentScreen.screen.elements || studentScreen.screen.elements.length === 0) {
    return <Stack spacing={2} >
        <div>Failed to load elements of screen</div>
        </Stack>;
  } else {
    return (
      <Stack spacing={2}>
        {studentScreen.screen.elements.map((element) => (
          <Element
          key={element._id}
          element={element}
          style={{ cursor: "context-menu" }}
        />
        ))}
      </Stack>
    );
  }
}