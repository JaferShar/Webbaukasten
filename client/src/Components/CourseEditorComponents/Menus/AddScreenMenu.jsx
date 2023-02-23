import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import SourceIcon from "@mui/icons-material/Source";
import ExplicitIcon from "@mui/icons-material/Explicit";
import Container from "@mui/material/Container";

export default function AddScreenMenu({
  anchorEl,
  handleClose,
  handleCreate
}) {
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
        <MenuItem onClick={() => {
          handleClick("Welcome")}}>
          <TitleIcon /> Wilkommen
        </MenuItem>
        <MenuItem onClick={() => {
          handleClick("Standard")}}>
          <SourceIcon />
          Standard
        </MenuItem>
      </Menu>
    </Container>
  );
}
