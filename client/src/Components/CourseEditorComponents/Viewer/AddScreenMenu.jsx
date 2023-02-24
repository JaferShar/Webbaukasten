import React from "react";
import { Menu, MenuItem } from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import SourceIcon from "@mui/icons-material/Source";
import Container from "@mui/material/Container";
/**
 * This module provides a menu that allows a standard or welcome template to be created.
 *
 * @param {*} {
 *   anchorEl The anchor element to attach the menu to.
 *   handleClose, The function to call when the menu is closed.
 *   handleCreate, The function to call when a new screen is created
 * }
 * @returns menu tab with standard and welcome templates.
 */
export default function AddScreenMenu({ anchorEl, handleClose, handleCreate }) {
  const handleClick = (template) => {
    handleCreate(template);
    handleClose();
  };
  return (
    <Container>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClick("Welcome");
          }}
        >
          <TitleIcon /> Wilkommen
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClick("Standard");
          }}
        >
          <SourceIcon />
          Standard
        </MenuItem>
      </Menu>
    </Container>
  );
}
