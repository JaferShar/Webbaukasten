import { useEffect } from "react";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getScreen } from "../../../features/courseEditor/screenSlice";

export default function WelcomeTemplate() {
  const studentScreen = useSelector((state) => state.studentScreen);

  if (!studentScreen) {
    return <Stack spacing={2} />;
  } else {
    return (
      <Stack spacing={2}>
        <h1>{studentScreen.screen.elements[0].text}</h1>
        <h2>{studentScreen.screen.elements[1].text}</h2>
      </Stack>
    );
  }
}
