import React, { useState, useEffect } from "react";
import "../../../Styling/SiteStyling/ScreenViewer.css";
import Article from '@mui/icons-material/Article';
import NoteAdd from '@mui/icons-material/NoteAdd';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";

function AddScreenItem({ onAddClick }) {
    return (
      <ListItem button onClick={onAddClick} className="rectangle-list-item">
        <NoteAdd style={{fontSize: 100}}/>
      </ListItem>
    );
  }


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

    const handleAddClick = () => {
        setScreens([...screens, {name: "Screen " + (screens.length + 1)}]);
    }

  return (
    <Grid className="ScreenViewer">

        <Paper style={{ display: 'flex', justifyContent: 'center', maxHeight: '100%', maxWidth: '100%', overflow: "auto" }}>
            <Paper style={{marginBottom: '200px'}}>
          <List>
            {screens.map((screen, index) => (
              <ListItem key={index} className="rectangle-list-item" style={{marginBottom: '30px', flexDirection: 'column'}}>
                <Article style={{fontSize: 100}}/>
                <ListItemText primaryTypographyProps={{variant: "body2"}} primary={index + 1} style={{marginTop: '60px'}}/>
              </ListItem>
            ))}
            <AddScreenItem onAddClick={() => {handleAddClick()}} />
            <ListItem sytele={{visibility:'hidden'}} />
          </List>
          </Paper>
        </Paper>
    </Grid>
  );
}

export default ScreenViewer;
