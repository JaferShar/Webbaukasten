import React from "react";
import { Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";
/**
 * This module provides a tab in the menu for deleting screens.
 *
 * @param {*} {
 *   anchorEl, The anchor element to attach the menu to.
 *   handleDelete, The function to call when the delete button is clicked.
 *   handleClose, Function to handle closing.
 * }
 * @returns tab that deletes screens.
 */
export default function DeleteScreenMenu({
  anchorEl,
  handleDelete,
  handleClose,
}) {
  return (
    <Container>
      <Menu
        id="long-menu"
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
