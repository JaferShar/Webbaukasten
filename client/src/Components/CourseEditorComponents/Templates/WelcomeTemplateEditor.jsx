import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { updateTextField } from "../../../features/courseEditor/screenSlice";
/**
 * This module provides the welcome template.
 *
 * @returns the welcome template.
 */
export default function WelcomeTemplate() {
  const screen = useSelector((state) => state.screenEditor.screen);
  const dispatch = useDispatch();

  const handleUpdateTextField = (event, element) => {
    const { value } = event.target;
    dispatch(
      updateTextField({ screen: screen, elementId: element._id, text: value })
    );
  };

  return (
    <Stack spacing={6}>
      <TextField
        defaultValue={
          screen.elements && screen.elements.length !== 0
            ? screen.elements[0].text
            : ""
        }
        onChange={(event) => handleUpdateTextField(event, screen.elements[0])}
        id="standard-basic"
        label="Course Title"
        variant="standard"
      />

<TextField
  defaultValue={
    screen.elements && screen.elements.length > 1
      ? screen.elements[1].text
      : ""
  }
  onChange={(event) => handleUpdateTextField(event, screen.elements[1])}
  id="standard-textarea"
  label="Course description"
  placeholder="Placeholder"
  multiline
  maxRows={null}
  variant="standard"
/>


      {/* <h1>{studentScreen.screen.elements[0].text}</h1>
        <h2>{studentScreen.screen.elements[1].text}</h2> */}
    </Stack>
  );
}
