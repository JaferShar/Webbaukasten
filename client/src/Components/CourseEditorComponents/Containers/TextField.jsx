import AddIcon from "@mui/icons-material/Add";
import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setTextField } from "../../../features/courseEditor/screenSlice";

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
