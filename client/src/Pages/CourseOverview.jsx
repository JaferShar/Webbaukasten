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
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, getAllCourses, deleteCourse, renameCourse} from '../features/courseOverview/courseOverViewSlice';
import {v4} from 'uuid'
import { useEffect } from 'react';


export default function CourseOverview() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedCourseId, setSelectedCourseId] = React.useState(null);
    const [courses, setCourses] = React.useState([{id: '1', cName: 'Test'}]);
    const [searchTerm, setSearchTerm] = React.useState("");

    const {account} = useSelector((state) => state.auth);
    const { coursesState, isLoading, isError, message } = useSelector(
        (state) => state.courseOverview
      )

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

    useEffect(() => {
        try {
            if (isError) {
                console.log(message);
            }    
            if (!account) {
                navigate('/login');
            }
            dispatch(getAllCourses())
            console.log(coursesState, 'courseOverview from redux inside useEffect')
            
        } catch (error) {
            toast('Kurse konnten nicht geladen werden', { type: 'error' });
        }      
    }, [account, navigate, dispatch, isError, message]);
    

    // tested
    const handleCreateCourse = async () => {
        let counter = v4();
        
        let courseName = `neuer Kurs + ${counter}`;
            
        try {
            const response = dispatch(createCourse({courseName}))
            console.log(response + 'response dispatch sajkhdbglkjfhdn')
            return;
            }
            //const courseId = await overviewService.createCourse(courseName);
        catch (error) {
            console.log(error, 'error inseide overview')
            toast(error.message, { type: 'error' });
        }
    };

    const handleDelete = async () => {
        try {
            dispatch(deleteCourse(selectedCourseId))            
        } catch (error) {
            toast(error.message, { type: 'error' });
        } finally {
            handleClose();
        }
    }

    const handleRename = async (newName) => {
        try {
            const changeCourse = coursesState.find(course => course._id === selectedCourseId)
            // nothing to do
            if (changeCourse.courseName === newName) {
                handleClose();
                return
            }
            const exist = coursesState.find(course => course.courseName === newName)
            if (exist) {
                throw new Error('Kursname existiert bereits')
            } 
            const courseData = {
                courseId: selectedCourseId,
                courseName: newName
            }
            dispatch(renameCourse(courseData))
        } catch (error) {
            toast(error.message, { type: 'error' });
        } finally {
            handleClose();
        }          
    };   
    
    return (
        <div>
        <ResponsiveAppBar handleSearch={handleSearch} searchTerm={searchTerm}/>
        <Box b={1} mt={5} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} sm={6}>
                <List>
                    {coursesState.filter(course => course.courseName.toLowerCase().includes(searchTerm.toLowerCase())).map((course) => (
                    <ListItem button key={course._id} >
                        <ListItemAvatar>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={course.courseName}/>
                        <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="more" onClick={(event) => handleClickMoreVertIcon(event, course._id)}>
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
            handleDelete={handleDelete}
            //handleShare={handleShare}
            //handlePublish={handlePublish}
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

