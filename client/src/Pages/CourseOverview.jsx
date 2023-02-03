import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, ListItemSecondaryAction} from '@mui/material';
import { Avatar, Button, IconButton, Menu, MenuItem, Grid, TextField } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../Styling/SiteStyling/CourseOverview.css'       
import { toast } from 'react-toastify';

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
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const handleClose = () => {
        setAnchorEl(null);
    };
  
    const handleClickMoreVertIcon = (event, courseId) => {
        setAnchorEl(event.currentTarget);
        setSelectedCourseId(courseId);
    };

    const handleCreateCourse = () => {
        let counter = 1;
        let courseName = "neuer Kurs";
        // eslint-disable-next-line no-loop-func
        while (courses.find(course => course.name === courseName)) {
            courseName = `neuer Kurs ${counter}`;
            counter += 1;
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
    const handleRename = (name) => {
        console.log(name)
        const changeCourse = courses.find(course => course.id === selectedCourseId)
        if (changeCourse.name === name) {
            handleClose();
            return
        }
        const exist = courses.find(course => course.name === name)
        if (exist) {
            toast('Kursname existiert bereits', {type: 'error'});
            handleClose();
            return
        }
        // change course name
        changeCourse.name = name
        //toast(changeCourse.name)
        setCourses([...courses])
        handleClose();
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
                        <ListItemText primary={course.name}/>
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
            handleRename={() => handleRename('Alter let\'s go')}
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