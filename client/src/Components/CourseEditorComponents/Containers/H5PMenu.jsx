import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setH5P } from "../../../features/courseEditor/screenSlice";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box, TextField } from "@mui/material";

const H5P = () => {
    const screen = useSelector((state) => state.screenEditor.screen);
    const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const handleClick = () => {
    dispatch(setH5P({ screenId: screen._id, content: value }))
    setValue("")
  };
  return (
    <Box>
      <TextField
        name='h5p-element'
        id='standard-basic'
        label='H5P-Link'
        variant='standard'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ width: "75%" }}
      />
      <Button
        onClick={handleClick}
        style={{
          border: "1px solid #d9dddd",         
        }}
        sx={{ pt: '10px', pb: '10px', pl: '20px', pr: '20px', ml: '1', mt: '1', mb: '1'}}
      >
        <AddIcon />
        Hochladen
      </Button>
    </Box>
  );
};

export default H5P;
