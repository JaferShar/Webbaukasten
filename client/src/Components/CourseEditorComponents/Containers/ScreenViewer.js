import React, { useState, useEffect } from "react";
import "../../../Styling/SiteStyling/ScreenViewer.css";
import Article from '@mui/icons-material/Article';
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

function ScreenViewer() {
  const [selectedScreen, setSelectedScreen] = useState(0);
  const [screens, setScreens] = useState([]);
  var quantity = 20;

  useEffect(() => {
    const newScreens = [];
    for (let i = 0; i < quantity; i++) {
      newScreens.push({
        name: "Screen " + (i + 1),
      });
    }
    setScreens(newScreens);
  }, [quantity]);

  return (
    <Grid className="ScreenViewer">

        <Paper style={{ display: 'flex', justifyContent: 'center', maxHeight: '100%', maxWidth: '100%', overflow: "auto" }}>
          <List>
            {screens.map((screen, index) => (
              <ListItem key={index} className="rectangle-list-item" style={{marginBottom: '30px', flexDirection: 'column'}}>
                <Article style={{fontSize: 100}}/>
                <ListItemText primaryTypographyProps={{variant: "body2"}} primary={index + 1} style={{marginTop: '60px'}}/>
              </ListItem>
            ))}
          </List>
        </Paper>
    </Grid>
  );
}

export default ScreenViewer;
