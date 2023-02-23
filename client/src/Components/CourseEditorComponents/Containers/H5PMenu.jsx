import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setH5P } from "../../../features/courseEditor/screenSlice";
import { Button, Box, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import H5PLogo from "../../../assets/H5PLogo.jpg";
/**
 *This component allows H5P content to be uploaded to a course screen.
 *
 * @return {JSX.Element} H5P element
 */
const H5P = () => {
  const screen = useSelector((state) => state.screenEditor.screen);
  const dispatch = useDispatch();
  const h5pWebsite = "https://h5p.org/content-types-and-applications";
  const [value, setValue] = useState("");
  const handleClick = () => {
    dispatch(setH5P({ screenId: screen._id, content: value }));
    setValue("");
  };
  return (
    <Box>
      <TextField
        name="h5p-element"
        id="standard-basic"
        label="H5P-Link"
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ width: "50%" }}
      />
      <Button
        onClick={handleClick}
        style={{
          border: "1px solid #d9dddd",
        }}
        sx={{
          pt: "10px",
          pb: "10px",
          pl: "20px",
          pr: "20px",
        }}
      >
        <AddIcon />
        Hochladen
      </Button>

      <Button
        component={Link}
        to={h5pWebsite}
        target="_blank"
        variant="text"
        size="small"
      >
        <img
          src={H5PLogo}
          alt="H5P Button"
          style={{ width: 100, height: 45 }}
        />
      </Button>
    </Box>
  );
};

export default H5P;
