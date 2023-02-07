import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import SourceIcon from "@mui/icons-material/Source";
import ExplicitIcon from "@mui/icons-material/Explicit";
import Container from "@mui/material/Container";

export default function AddScreenMenu({
  anchorEl,
  handleClose,
  handleWelcome,
  handleStandard,
  handleEnd,
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
        <MenuItem onClick={handleWelcome}>
          <TitleIcon /> Wilkommen
        </MenuItem>
        <MenuItem onClick={handleStandard}>
          <SourceIcon />
          Standard
        </MenuItem>
        <MenuItem onClick={handleEnd}>
          <ExplicitIcon />
          Ende
        </MenuItem>
      </Menu>
    </Container>
  );
}
