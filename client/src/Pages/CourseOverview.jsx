import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction} from '@mui/material';
import { Avatar, Button, IconButton, Grid } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../Styling/SiteStyling/CourseOverview.css'       
import { toast } from 'react-toastify';
import overviewService from '../features/course/overviewService';
import MoreVertMenu from '../Components/CourseOverviewComponents/MoreVertMenu';
import SearchBar from  '../Components/CourseOverviewComponents/SearchBar';

export default function CourseOverview({props}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedCourseId, setSelectedCourseId] = React.useState(null);
    const [courses, setCourses] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const navigate = useNavigate();

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

    // load courses tested
    useEffect(() => {
        try {
            overviewService.getAllCourses().then((courses) => {
                setCourses(courses);
            });
        } catch (error) {
            toast('Kurse konnten nicht geladen werden', { type: 'error' });
        }      
    }, []);

    // tested
    const handleCreateCourse = async () => {
        let counter = 1;
        let courseName = "neuer Kurs";
        while (courses.find(course => course.cName === courseName)) {
            courseName = `neuer Kurs ${counter}`;
            counter += 1;
        }    
        try {
            const courseId = await overviewService.createCourse(courseName);
            setCourses([...courses, { id: courseId, cName: courseName }]);
        } catch (error) {
            toast(error.message, { type: 'error' });
        }
    };
    
    // tested
    const handleDelete = async () => {
        try {
            await overviewService.deleteCourse(selectedCourseId)
            setCourses(courses.filter(course => course.id !== selectedCourseId));
        } catch (error) {
            toast(error.message, { type: 'error' });
        } finally {
            handleClose();
        }
    };

    // tested
    const handleEdit = () => {
        navigate('/kurs')
    };

    // To DO
    const handleShare = () => {
    };
    const handlePublish = () => {
    };

    // tested
    const handleRename = async (newName) => {
        try {
            const changeCourse = courses.find(course => course.id === selectedCourseId)
            // nothing to do
            if (changeCourse.cName === newName) {
                handleClose();
                return
            }
            const exist = courses.find(course => course.cName === newName)
            if (exist) {
                throw new Error('Kursname existiert bereits')
            }       
            await overviewService.updateCourse(selectedCourseId, newName)  
            changeCourse.cName = newName
            setCourses([...courses]) 
            //originalCourses = courses;   
        } catch (error) {
            toast(error.message, { type: 'error' });
        } finally {
            handleClose();
        }          
    };
    
    return (
        <div>
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm}/>
        <Box b={1} mt={5} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} sm={6}>
                <List>
                    {courses.filter(course => course.cName.toLowerCase().includes(searchTerm.toLowerCase())).map((course) => (
                    <ListItem key={course.id}
                    button
                    component={Link} to={`/kurs`}>
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
