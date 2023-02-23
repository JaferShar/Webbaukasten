import { Stack } from "@mui/material";
import { useSelector } from "react-redux";

export default function WelcomeTemplate() {
  const studentScreen = useSelector((state) => state.studentScreen);

  if (!studentScreen.screen || !studentScreen.screen.elements ) {
    return <Stack spacing={2} />;
  } else {
    return (
      <Stack spacing={6}>
        <h1>{studentScreen.screen.elements[0].text}</h1>
        <div contenteditable="true">{studentScreen.screen.elements[1].text}</div>
      </Stack>
    );
  }
}