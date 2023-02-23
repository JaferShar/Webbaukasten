import { useState } from "react";
import { Box, Button, InputLabel, Popover } from "@mui/material";

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
    <Popover
      open={imageModalOpen}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Box p={2}>
        <Box mt={2}>
          <input
            accept='image/*'
            id='contained-button-file'
            multiple
            type='file'
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <InputLabel htmlFor='contained-button-file'>
            {file ? file.name : "Bild auswählen"}
          </InputLabel>
        </Box>
        <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant='contained'
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
          <Button variant='outlined' onClick={handleClose}>
            Abbrechen
          </Button>
        </Box>
      </Box>
    </Popover>
  );
}
