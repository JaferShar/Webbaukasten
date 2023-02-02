import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, ListItemSecondaryAction} from '@mui/material';
import { Avatar, Button, IconButton, Menu, MenuItem, Grid } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../Styling/SiteStyling/CourseOverview.css'       

function MoreVertMenu({ anchorEl, selectedIndex, handleClose, handleDelete, handleEdit, handleShare, handlePublish, handleRename }) {
    return (
        <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>       
            <MenuItem onClick={handleEdit}>Editieren</MenuItem>
            <MenuItem onClick={handleShare}>Teilen</MenuItem>
            <MenuItem onClick={handlePublish}>Veröffentlichen</MenuItem>
            <MenuItem onClick={handleDelete}>Löschen</MenuItem>
            <MenuItem onClick={handleRename}>Umbenennen</MenuItem>
        </Menu>
    );
}

export default function CourseOverview({props}) {
    // const for MoreVertIcon
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };
  
    const handleClickMoreVertIcon = (event, index) => {
        console.log('hi')
        setAnchorEl(event.currentTarget);
        setSelectedIndex(index);
    };
    const [courses, setCourses] = useState([]);
    
    const handleCreateCourse = () => {
        setCourses([...courses,  {id: courses.length + 1, name: 'Kurs ' + (courses.length + 1)}]);
    };
    const handleDelete = (id) => {
        setCourses(courses.filter((course) => course.id !== id));
    };
    const handleEdit = () => {
    };
    const handleShare = () => {
    };
    const handlePublish = () => {
    };
    const handleRename = () => {
    };

    return (
        <div>
          <header id='header'>
            <h1>Kursübersicht</h1>
          </header>
          <Box b={1} mt={5} />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <List>
                    {courses.map((course, index) => (
                      <ListItem key={course.id}>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={course.name}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="more" onClick={(event) => handleClickMoreVertIcon(event, index)}>
                            <MoreVertIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <MoreVertMenu
            anchorEl={anchorEl}
            selectedIndex={selectedIndex}
            handleClose={handleClose}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleShare={handleShare}
            handlePublish={handlePublish}
            handleRename={handleRename}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleCreateCourse}>
              <AddIcon />
              Kurs erstellen
            </Button>
          </Box>
        </div>
      );
}    