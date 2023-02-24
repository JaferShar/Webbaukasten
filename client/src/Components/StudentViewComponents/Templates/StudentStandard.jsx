import { Stack } from "@mui/material";
import Element from "../Element";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

export default function StudentStandard() {
    const studentScreen = useSelector(
        (state) => state.studentScreen
    );

  if (!studentScreen.screen.elements || studentScreen.screen.elements.length === 0) {
    return <Stack spacing={2} >
        <div>
        <Alert severity="warning">
              {" "}
              Failed to load elements or there are no elements on this screen.{" "}
            </Alert>
        </div>
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