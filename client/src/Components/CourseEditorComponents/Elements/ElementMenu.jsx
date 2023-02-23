import { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  SwapHoriz as SwapHorizIcon,
} from "@mui/icons-material";
import H5PPopover from "./H5PPopover";
import ImagePopover from "./ImagePopover";

export default function ElementMenu({
  anchorEl,
  handleClose,
  handleDelete,
  handleExchangeTextField,
  handleExchangeImage,
  handleExchangeH5P,
}) {
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [h5pModalOpen, setH5PModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [h5pAnchorEl, setH5PAnchorEl] = useState(null);
  const [imageAnchorEl, setImageAnchorEl] = useState(null);

  const handleOpenSubMenu = (event) => {
    setSubMenuAnchorEl(event.currentTarget);
  };

  const handleCloseSubMenu = () => {
    setSubMenuAnchorEl(null);
  };

  const handleClickTextField = () => {
    handleClose();
    handleCloseSubMenu();
    handleExchangeTextField();
  };

  const handleClickImage = (event) => {
    setImageModalOpen(true);
    setImageAnchorEl(event.currentTarget);
  };

  const handleClickH5P = (event) => {
    setH5PModalOpen(true);
    setH5PAnchorEl(event.currentTarget);
  };

  const closeAll = () => {
    handleClose();
    handleCloseSubMenu();
    setH5PModalOpen(false);
    setImageModalOpen(false);
  };

  return (
    <Box sx={{ width: "250px", display: "flex", alignItems: "center" }}>
      <Menu
        id='long-menu'
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List>
          <ListItemButton onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary='Löschen' />
          </ListItemButton>
          <ListItemButton
            onClick={(event) => {
              handleOpenSubMenu(event);
            }}
          >
            <ListItemIcon>
              <SwapHorizIcon />
            </ListItemIcon>
            <ListItemText primary='Austauschen' />
          </ListItemButton>
        </List>
      </Menu>
      <Menu
        id='long-menu'
        keepMounted
        open={Boolean(subMenuAnchorEl)}
        onClose={handleCloseSubMenu}
        anchorEl={subMenuAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <List>
          <ListItemButton onClick={handleClickTextField}>
            <ListItemText primary='Textfeld' />
          </ListItemButton>
          <ListItemButton onClick={(event) => {
            handleClickImage(event);
            }}>
            <ListItemText primary='Bild' />
          </ListItemButton>
          <ListItemButton
            onClick={(event) => {
              handleClickH5P(event);
            }}
          >
            <ListItemText primary='H5P' />
          </ListItemButton>
        </List>
      </Menu>
      <H5PPopover
        h5pModalOpen={h5pModalOpen}
        handleClose={closeAll}
        anchorEl={h5pAnchorEl}
        handleExchangeH5P={handleExchangeH5P}
      />
      <ImagePopover
        imageModalOpen={imageModalOpen}
        handleClose={closeAll}
        anchorEl={imageAnchorEl}
        handleExchangeImage={handleExchangeImage}
      />
    </Box>
  );
}
