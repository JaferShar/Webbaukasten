import React from "react";
import { Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";

export default function DeleteScreenMenu({
  anchorEl,
  handleDelete,
  handleClose,
}) {
  return (
    <Container>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>
          <DeleteIcon /> Löschen
        </MenuItem>
      </Menu>
    </Container>
  );
}
