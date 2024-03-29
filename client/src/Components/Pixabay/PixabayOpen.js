import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import PixabaySearch from "./PixabaySearch";
import PixabayLogo from "../../assets/logoPixabay.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  minWidth: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
/**
 * This module displays a button with the Pixabay logo,
 * and when clicked, opens a modal window containing the PixabaySearch component.
 * @returns button to open Pixabay.
 */
export default function PixabayTestPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <img src={PixabayLogo} alt="Pixabay Button" style={{ width: "13vh" }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PixabaySearch handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
