import React from "react";
import { Box, Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ElementMenu({ anchorEl, handleClose, handleDelete }) {
  return (
    <Box sx={{ maxHeight: "80vh", overflow: "auto" }}>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>Löschen</MenuItem>
        <SubMenu />
      </Menu>
    </Box>
  );
}

function SubMenu() {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Austauschen</AccordionSummary>
      <AccordionDetails sx={{ padding: "8px 16px" }}>
        <List>
          <ListItem button sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <ListItemText primary="Textfeld" />
          </ListItem>
          <ListItem button sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <ListItemText primary="Bild" />
          </ListItem>
          <ListItem button sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <ListItemText primary="H5P" />
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
