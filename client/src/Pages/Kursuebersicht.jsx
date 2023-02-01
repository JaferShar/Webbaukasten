import * as React from 'react';
import { createBrowserHistory } from "history";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import '../Styling/SiteStyling/Kursuebersicht.css'

export default function Kursübersicht() {
    // const for MoreVertIcon
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const MyOptions = [
        "Editieren",
        "Teilen",
        "Veröffentlichen",
        "Löschen",
        "Umbenennen",
    ];
  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
  
    const handleClose = () => {
        setAnchorEl(null);
    };
    // const for AddIcon
    const [courses, setCourses] = useState(['Kurs 1']);
    
    const handleCreateCourse = () => {
        setCourses([...courses, 'Neuer Kurs']);
    };

    const history = createBrowserHistory();
    const handleListItemClicked = () => {
        history.push('/kurs');
    };

    return (    
        <div>
            <header className="header">
                <h1>Kursübersicht</h1>
            </header>
            <Box b={1} mt={5} /> {/* add a border and a margin-top of 2 */}
            <Box sx={{ display: 'flex', flexGrow: 1, maxWidth: '100%', justifyContent: 'center'}}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="flex-start"
                    item xs={12} md={6}>
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <Button  
                            variant="contained" 
                            startIcon={<AddIcon />} 
                            onClick={handleCreateCourse}>
                                    Neuen Kurs erstellen
                        </Button>

                        <List component="nav" aria-label='main mailbox folders'>                           
                            {courses.map((item, index) => (
                            <ListItem key={index} component="button" onClick={handleListItemClicked}
                            secondaryAction={
                                <div>
                                <IconButton 
                                    edge="end" 
                                    aria-label="more"
                                    onClick={handleClick}
                                    aria-haspopup="true"
                                    aria-controls="long-menu">
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu 
                                    anchorEl={anchorEl} 
                                    keepMounted onClose={handleClose} 
                                    open={open}>
                                    {MyOptions.map((option) => (
                                        <MenuItem
                                            key={option} 
                                            onClick={handleClose}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                                </div>
                            }>
                                <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                <ListItemText primary={item}/>
                            </ListItem>
                            ))}
                        </List>

                    </div>
                </Grid>
            </Box>
      </div>
      
    )
}

