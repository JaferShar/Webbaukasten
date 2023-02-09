import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction} from '@mui/material';
import { Avatar, Button, IconButton, Grid } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../Styling/SiteStyling/CourseOverview.css'       
import { toast } from 'react-toastify';
import MoreVertMenu from '../Components/CourseOverviewComponents/MoreVertMenu';
import ResponsiveAppBar from '../Components/ResponsiveAppBar';
import { useDispatch } from 'react-redux';
import { createCourse } from '../features/courseOverview/courseOverViewSlice';

export default function CourseOverview() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedCourseId, setSelectedCourseId] = React.useState(null);
    const [courses, setCourses] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClose = () => {
        setAnchorEl(null);
    }; 

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClickMoreVertIcon = (event, courseId) => {
        setAnchorEl(event.currentTarget);
        setSelectedCourseId(courseId);
    };

    // tested
    const handleCreateCourse = async () => {
        let counter = 1;
        let courseName = "neuer Kurs";
        while (courses.find(course => course.cName === courseName)) {
            courseName = `neuer Kurs ${counter}`;
            counter += 1;
        }    
        try {
            dispatch(createCourse({courseName}))
            const courseId = courses.length + 1;
            setCourses([...courses, { id: courseId, cName: courseName }]);
            return;
        } catch (error) {
            toast(error.message, { type: 'error' });
        }
    };
    
    return (
        <div>
        <ResponsiveAppBar handleSearch={handleSearch} searchTerm={searchTerm}/>
        <Box b={1} mt={5} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} sm={6}>
                <List>
                    {courses.filter(course => course.cName.toLowerCase().includes(searchTerm.toLowerCase())).map((course) => (
                    <ListItem key={course.id}
                    button
                    component={Link} to={`/kurs/${course.id}`}>
                        <ListItemAvatar>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={course.cName}/>
                        <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="more" onClick={(event) => handleClickMoreVertIcon(event, course.id)}>
                            <MoreVertIcon />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    ))}
                </List>
            </Grid>
        </Box>
        <MoreVertMenu
            anchorEl={anchorEl}
            handleClose={handleClose}
            //handleDelete={() => handleDelete()}
            //handleEdit={handleEdit}
            //handleShare={handleShare}
            //handlePublish={handlePublish}
            //handleRename={handleRename}
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
