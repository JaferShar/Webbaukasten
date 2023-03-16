import { useState, useEffect } from "react";
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
export default function ScaleImageModal({
  scaleModalOpen,
  handleClose,
  handleScaleImage,
  selectedElement,
}) {
  const [sliderValue, setSliderValue] = useState(1.0);

  useEffect(() => {
    if (selectedElement) {
      setSliderValue(getDefaultSliderValue());
    }
  }, [selectedElement]);

  function getDefaultSliderValue() {
    if (!selectedElement) return 1;
    const url = selectedElement.url;
    const regex = /^(.*?\/upload\/)(w_\d\.\d+,c_scale\/)(.*)$/;
    if (regex.test(url)) {
      console.log("regex matched")
      const regexDigit = /w_(\d+(?:\.\d+)?)/;
      const [, , scale] = url.match(regex);
      const match = scale.match(regexDigit);
      const numberAfterW = match[1] ? match[1] : null;
      return parseFloat(numberAfterW);
    }
    return 1.0;
  }

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
            aria-label='Default'
            valueLabelDisplay='auto'
            step={0.1}
            marks
            min={0}
            max={2.0}
            value={sliderValue}
            onChange={(event, newValue) => {
              setSliderValue(newValue);
            }}
          />
        </Box>
        <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant='contained'
            onClick={() => {
              handleScaleImage(sliderValue);
              setSliderValue(1.0);
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
