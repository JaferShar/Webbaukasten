import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, TextField, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import PublishIcon from "@mui/icons-material/Publish";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Container from "@mui/material/Container";

export default function MoreVertMenu({
  anchorEl,
  handleClose,
  handleDelete,
  handleShare,
  handlePublish,
  handleRename,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");

  const handleClickRename = () => {
    handleClose();
    setModalOpen(true);
  };

  const handleClickShare = () => {
    handleClose();
    setOpenModal(true);
  };

  const handleSubmit = () => {
    handleRename(newName);
    setModalOpen(false);
  };

  const handleSubmitShare = () => {
    handleShare(email);
    setOpenModal(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Container>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClickRename}>
          <DriveFileRenameOutlineIcon />
          Umbenennen
        </MenuItem>
        <MenuItem onClick={handleClickShare}>
          <ShareIcon />
          Teilen
        </MenuItem>
        <MenuItem onClick={handlePublish}>
          <PublishIcon />
          Veröffentlichen
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          {" "}
          <DeleteIcon />
          Löschen
        </MenuItem>
      </Menu>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
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
            label='Neuer Kursname'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleSubmit} onKeyDown={handleKeyDown}>
              OK
            </Button>
            <Button onClick={() => setModalOpen(false)}>Abbrechen</Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
            label='User Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleSubmitShare}>OK</Button>
            <Button onClick={() => setOpenModal(false)}>Abbrechen</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
