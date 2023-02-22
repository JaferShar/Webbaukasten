// import React from "react";
// import {
//   Box,
//   Menu,
//   MenuItem,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   List,
//   ListItemButton,
//   ListItemText,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import DeleteIcon from "@mui/icons-material/Delete";

// export default function ElementMenu({ anchorEl, handleClose, handleDelete }) {
//   return (
//     <Box style={{ width: '100%', height: "auto", overflow: "auto" }}>
//       <Menu
//         id='long-menu'
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleDelete}>
//           <DeleteIcon sx={{ mr: 1 }} />
//           Löschen
//         </MenuItem>
//         <SubMenu />
//       </Menu>
//     </Box>
//   );
// }

// function SubMenu() {
//   return (
//     <Accordion>
//       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//         Austauschen
//       </AccordionSummary>
//       <AccordionDetails sx={{ padding: "8px 16px" }}>

//           <ListItemButton sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
//             <ListItemText primary='Textfeld' />
//           </ListItemButton>
//           <ListItemButton sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
//             <ListItemText primary='Bild' />
//           </ListItemButton>
//           <ListItemButton sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
//             <ListItemText primary='H5P' />
//           </ListItemButton>

//       </AccordionDetails>
//     </Accordion>
//   );
// }

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

export default function ElementMenu({ anchorEl, handleClose, handleDelete }) {
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);

  const handleOpenSubMenu = (event) => {
    setSubMenuAnchorEl(event.currentTarget);
  };

  const handleCloseSubMenu = () => {
    setSubMenuAnchorEl(null);
    handleClose();
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
          <ListItemButton onClick={handleDelete}>
            <ListItemText primary='Textfeld' />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary='Bild' />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary='H5P' />
          </ListItemButton>
        </List>
      </Menu>
    </Box>
  );
}
