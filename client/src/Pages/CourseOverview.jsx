import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, ListItemSecondaryAction} from '@mui/material';
import { Avatar, Button, IconButton, Menu, MenuItem, Grid } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../Styling/SiteStyling/CourseOverview.css'       

function MoreVertMenu({ anchorEl, handleClose, handleDelete, handleEdit, handleShare, handlePublish, handleRename }) {
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
    const [selectedCourseId, setSelectedCourseId] = React.useState(null);
    const [counter, setCounter] = useState(1);
    const [courseName, setCourseName] = useState("neuer Kurs");
    const navigate = useNavigate();

    const handleClose = () => {
        setAnchorEl(null);
    };
  
    const handleClickMoreVertIcon = (event, courseId) => {
        console.log('hi')
        setAnchorEl(event.currentTarget);
        setSelectedCourseId(courseId);
    };
    const [courses, setCourses] = useState([]);
    
    const handleCreateCourse = () => {
    const existingCourse = courses.find(course => course.name === courseName);
    if (existingCourse) {
        setCounter(prevCounter => prevCounter + 1);
        setCourseName(`neuer Kurs ${counter}`);
    }
    setCourses([...courses, { id: uuidv4(), name: courseName }]);
    };
    
    const handleDelete = () => {
        console.log(selectedCourseId)
        setCourses(courses.filter((course) => course.id !== selectedCourseId));
        handleClose();
    };
    const handleEdit = () => {
        navigate('/kurs')
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
                    {courses.map((course) => (
                      <ListItem key={course.id}
                      button
                      component={Link} to={`/kurs`}>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={course.name}
                          
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="more" onClick={(event) => handleClickMoreVertIcon(event, course.id)}>
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
            selectedCourseId={selectedCourseId}
            handleClose={handleClose}
            handleDelete={() => handleDelete()}
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