import { useState } from "react";
import { Box, Button, TextField, Modal } from "@mui/material";
/**
 * This module provides a popup to exchange an existing image by uploading another one.
 *
 * @param {*} {
 *   h5pModalOpen, Function to handle opening.
 *   handleClose, Function to handle closing.
 *   anchorEl,
 *   handleExchangeH5P, Function to handle the exchange of H5P element.
 * }
 * @returns popup to upload an H5P element.
 */
export default function H5PModal({
  h5pModalOpen,
  handleClose,
  handleExchangeH5P,
}) {
  const [content, setContent] = useState("");

  return (
    <Modal open={h5pModalOpen} onClose={handleClose}>
      <Box
        p={2}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          label="H5P Link"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => {
              handleClose();
              handleExchangeH5P(content);
            }}
          >
            Hochladen
          </Button>
          <Box mx={1} />
          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
              setContent("");
            }}
          >
            Abbrechen
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
