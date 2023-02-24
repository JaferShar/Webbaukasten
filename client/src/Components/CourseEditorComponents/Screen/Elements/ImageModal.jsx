import { useState } from "react";
import { Box, Button, InputLabel, Modal } from "@mui/material";
/**
 * This module provides a popup to exchange an existing image by uploading another one.
 *
 * @param {*} {
 *   imageModalOpen, Function to handle opening.
 *   handleClose, Function to handle closing.
 *   anchorEl,
 *   handleExchangeImage, Function to handle exhanging images.
 * }
 * @returns popup to upload an image.
 */
export default function PrettyPopover({
  imageModalOpen,
  handleClose,
  anchorEl,
  handleExchangeImage, 
}) {
  const [file, setFile] = useState(null);

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal open={imageModalOpen} onClose={handleClose}>
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
        <Box mt={2}>
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <InputLabel htmlFor="contained-button-file">
            {file ? file.name : "Bild auswählen"}
          </InputLabel>
        </Box>
        <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            disabled={!file}
            onClick={() => {
              handleExchangeImage(file);
              setFile(null);
              handleClose();
            }}
          >
            Hochladen
          </Button>
          <Box mx={1} />
          <Button variant="outlined" onClick={handleClose}>
            Abbrechen
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
