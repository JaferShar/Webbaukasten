import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setH5P } from "../../../features/courseEditor/screenSlice";
import { Button, Box, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import H5PLogo from "../../../assets/H5PLogo.jpg";
import { toast } from "react-toastify";

const invalidLinkNotify = () => {
  toast.error("Kein gültiger Link", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
/**
 *This component allows H5P content to be uploaded to a course screen.
 *
 * @returns H5P element
 */
const H5P = () => {
  const screen = useSelector((state) => state.screenEditor.screen);
  const dispatch = useDispatch();
  const h5pWebsite = "https://h5p.org/content-types-and-applications";
  const [value, setValue] = useState("");
  const validH5PLink = new RegExp("https://h5p.org/h5p/embed/[0-9]+");

  /*handleClick checks if the input value in the H5P-Searchbar is a valid H5P-element URL.
  Dispatches if it is, else notifies toastify that throws an error*/
  const handleClick = () => {
    const h5pURL = String(value.match(validH5PLink));
    if (!h5pURL || h5pURL === "null") {
      invalidLinkNotify();
      setValue("");
    } else {
      dispatch(setH5P({ screenId: screen._id, content: h5pURL }));
      setValue("");
    }
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
