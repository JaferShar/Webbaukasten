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
import H5PModal from "./H5PModal";
import ImageModal from "./ImageModal";
/**
 * This module dleivers a menu that allows the user to edit,delete and swap elements within the screen editor.
 *
 * @param {*} {
 *   anchorEl 
 *   handleClose, Function to handle closing.
 *   handleDelete, Function to handle delete.
 *   handleExchangeTextField, Function to handle swapping the text field.
 *   handleExchangeImage, Function to handle swapping the image.
 *   handleExchangeH5P, Function to handle swapping the H5P element.
 * }
 * @returns A menu with edit, delete and swap tabs.
 */
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

  const handleClickImage = () => {
    setImageModalOpen(true);
  };

  const handleClickH5P = () => {
    setH5PModalOpen(true);
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
        id="long-menu"
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
            <ListItemText primary="Löschen" />
          </ListItemButton>
          <ListItemButton
            onClick={(event) => {
              handleOpenSubMenu(event);
            }}
          >
            <ListItemIcon>
              <SwapHorizIcon />
            </ListItemIcon>
            <ListItemText primary="Austauschen" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <SwapHorizIcon />
            </ListItemIcon>
            <ListItemText primary="Bearbeiten" />
          </ListItemButton>
        </List>
      </Menu>
      <Menu
        id="long-menu"
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
            <ListItemText primary="Textfeld" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              handleClickImage();
            }}
          >
            <ListItemText primary="Bild" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              handleClickH5P();
            }}
          >
            <ListItemText primary="H5P" />
          </ListItemButton>
        </List>
      </Menu>
      <H5PModal
        h5pModalOpen={h5pModalOpen}
        handleClose={closeAll}
        handleExchangeH5P={handleExchangeH5P}
      />
      <ImageModal
        imageModalOpen={imageModalOpen}
        handleClose={closeAll}
        handleExchangeImage={handleExchangeImage}
      />
    </Box>
  );
}
