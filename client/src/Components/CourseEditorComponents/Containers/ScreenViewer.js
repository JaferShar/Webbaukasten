import React, { useState, useEffect } from "react";
import "../../../Styling/SiteStyling/ScreenViewer.css";
import Article from '@mui/icons-material/Article';
import NoteAdd from '@mui/icons-material/NoteAdd';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Grid,
} from "@mui/material";
import TitleIcon from '@mui/icons-material/Title';
import ExplicitIcon from "@mui/icons-material/Explicit";
import AddScreenMenu from "../Menus/AddScreenMenu";
import { useDispatch } from 'react-redux';
//import { createScreen } from '../../../features/courseEditor/courseEditorSlice'

function AddScreenItem({ onAddClick }) {
    return (
      <ListItem button onClick={onAddClick} className="rectangle-list-item">
        <NoteAdd style={{fontSize: 100}}/>
      </ListItem>
    );
  }


function ScreenViewer({changeTemplate}) {
  const dispatch = useDispatch();
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
        let template = 'Welcome';
        setScreens([...screens, {name: "Screen " + (screens.length + 1), template: template}]);
        setSelectedScreen(screens.length - 1);
        changeTemplate(template);
        handleClose();
    }

    const handleStandard = () => {
        let template = 'Standard';
        setScreens([...screens, {name: "Screen " + (screens.length + 1), template: template}]);
        setSelectedScreen(screens.length - 1);
        changeTemplate(template);
        handleClose();
    }

    const handleEnd = () => {
      let template = 'End';
        setScreens([...screens, {name: "Screen " + (screens.length + 1), template: template}]);
        setSelectedScreen(screens.length - 1);
        changeTemplate(template);
        handleClose();
    }
  return (
    <Grid className="ScreenViewer">

        <Paper style={{ display: 'flex', justifyContent: 'center', maxHeight: '100%', maxWidth: '100%', overflow: "auto" }}>
            
          <List>
            {screens.map((screen, index) => (
                <ListItemButton key={index} className="rectangle-list-item" style={{flexDirection: 'column', border: '1px solid #d9dddd'}} sx={{mb: 2}}>
                {screen.template === "Welcome" && <TitleIcon style={{fontSize: 100}}/>}
                {screen.template === "Standard" && <Article style={{fontSize: 100}}/>}
                {screen.template === "End" && <ExplicitIcon style={{fontSize: 100}}/>}
                <ListItemText primaryTypographyProps={{variant: "body2"}} primary={index + 1} style={{marginTop: '60px'}}/>
              </ListItemButton>
              
            ))}
            <AddScreenItem onAddClick={(event) => {handleAddClick(event)}} />
            <ListItem sytele={{display: 'none'}} />
          </List>
 
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
