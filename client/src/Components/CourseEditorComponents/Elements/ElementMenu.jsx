import React from "react";
import {
  Box,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ElementMenu({ anchorEl, handleClose, handleDelete }) {
  return (
    <Box sx={{ maxHeight: "80vh", overflow: "auto" }}>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1 }} />
          Löschen
        </MenuItem>
        <SubMenu />
      </Menu>
    </Box>
  );
}

function SubMenu() {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Austauschen
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "8px 16px" }}>
        <List>
          <ListItemButton sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <ListItemText primary='Textfeld' />
          </ListItemButton>
          <ListItemButton sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <ListItemText primary='Bild' />
          </ListItemButton>
          <ListItemButton sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <ListItemText primary='H5P' />
          </ListItemButton>
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
