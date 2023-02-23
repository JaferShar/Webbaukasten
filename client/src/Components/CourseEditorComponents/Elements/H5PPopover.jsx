import { useState } from "react";
import { Box, Button, TextField, Popover } from "@mui/material";

export default function H5PPopover({
  h5pModalOpen,
  handleClose,
  anchorEl,
  handleExchangeH5P,
}) {
  const [content, setContent] = useState("");

  return (
    <Popover
      open={h5pModalOpen}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Box p={2}>
        <TextField
          label='H5P Link'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant='contained'
          onClick={() => {
            handleClose()
            handleExchangeH5P(content)
          }}
          >
            Hochladen
          </Button>
          <Box mx={1} />
          <Button variant='outlined'
          onClick={() => {
            handleClose()
            setContent("")
          }}>Abbrechen</Button>
        </Box>
      </Box>
    </Popover>
  );
}
