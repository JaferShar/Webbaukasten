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
import AddScreenMenu from "../Menus/AddScreenMenu";

function AddScreenItem({ onAddClick }) {
    return (
      <ListItem button onClick={onAddClick} className="rectangle-list-item">
        <NoteAdd style={{fontSize: 100}}/>
      </ListItem>
    );
  }


function ScreenViewer({changeTemplate}) {
  const [selectedScreen, setSelectedScreen] = useState(0);
  const [screens, setScreens] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  var quantity = 20;

  useEffect(() => {
    const newScreens = [];
    newScreens.push({name: "Screen 1", template: 'Welcome'})
    for (let i = 1; i < quantity; i++) {
      newScreens.push({
        name: "Screen " + (i + 1),
        template: 'Standard'
      });
    }
    setScreens(newScreens);
  }, [quantity]);

    const handleAddClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }; 

    const handleWelcome = () => {
        setScreens([...screens, {name: "Screen " + (screens.length + 1), template: 'Welcome'}]);
        setSelectedScreen(screens.length - 1);
        changeTemplate('Welcome');
        handleClose();
    }

    const handleStandard = () => {
        setScreens([...screens, {name: "Screen " + (screens.length + 1), template: 'Standard'}]);
        setSelectedScreen(screens.length - 1);
        changeTemplate('Standard');
        handleClose();
    }

    const handleEnd = () => {
        setScreens([...screens, {name: "Screen " + (screens.length + 1), template: 'End'}]);
        setSelectedScreen(screens.length - 1);
        changeTemplate('End');
        handleClose();
    }
  return (
    <Grid className="ScreenViewer">

        <Paper style={{ display: 'flex', justifyContent: 'center', maxHeight: '100%', maxWidth: '100%', overflow: "auto" }}>
            <Paper style={{marginBottom: '200px'}}>
          <List>
            {screens.map((screen, index) => (
              <ListItem key={index} button className="rectangle-list-item" style={{marginBottom: '30px', flexDirection: 'column'}}>
                <Article style={{fontSize: 100}}/>
                <ListItemText primaryTypographyProps={{variant: "body2"}} primary={index + 1} style={{marginTop: '60px'}}/>
              </ListItem>
            ))}
            <AddScreenItem onAddClick={(event) => {handleAddClick(event)}} />
            <ListItem sytele={{visibility:'hidden'}} />
          </List>
          </Paper>
        </Paper>
        <AddScreenMenu 
            anchorEl={anchorEl}
            handleClose={handleClose}
            handleWelcome={handleWelcome}
            handleStandard={handleStandard}
            handleEnd={handleEnd}
        />
    </Grid>
  );
}

export default ScreenViewer;
