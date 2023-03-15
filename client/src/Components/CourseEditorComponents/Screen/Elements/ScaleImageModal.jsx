import { useState } from "react";
import { Box, Button, Modal, Slider } from "@mui/material";
/**
 * This module provides a popup to rescale an existing image.
 *
 * @param {*} {
 *   imageModalOpen, Function to handle opening.
 *   handleClose, Function to handle closing.
 * }
 * @returns popup to scale an image.
 */
export default function ImageModal({ scaleModalOpen, handleClose }) {
  return (
    <Modal open={scaleModalOpen} onClose={handleClose}>
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
        <Box>
            Width
            <Slider
                defaultValue={1}
                aria-label="Default"
                valueLabelDisplay="auto"
                step={0.1}
                marks
                min={0}
                max={1}
            />
        </Box>
        <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant='contained'
            onClick={() => {
              handleClose();
            }}
          >
            OK
          </Button>
          <Box mx={1} />
          <Button variant='outlined' onClick={handleClose}>
            Abbrechen
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
