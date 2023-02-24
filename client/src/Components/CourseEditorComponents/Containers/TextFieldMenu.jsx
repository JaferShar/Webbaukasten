import AddIcon from "@mui/icons-material/Add";
import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setTextField } from "../../../features/courseEditor/screenSlice";

/**
 * This component provides a button that when clicked shows a text field to add text notes.
 * @returns  Add text button.
 */
const TextField = () => {
  const screen = useSelector((state) => state.screenEditor.screen);
  const dispatch = useDispatch();
  const handleCreateTextField = () => {
    dispatch(setTextField({ screenId: screen._id, text: "" }));
  };
  return (
    <Box>
      <Button
        onClick={handleCreateTextField}
        style={{
          border: "1px solid #d9dddd",
        }}
      >
        <AddIcon />
        Textfeld erstellen
      </Button>
    </Box>
  );
};
export default TextField;
