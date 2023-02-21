import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import data from '../assets/DummyCourse.json';
import ProgressBar from "@ramonak/react-progress-bar";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { getCourseData } from "../features/studentView/studentCourseSlice";
import { useEffect } from 'react';
import { useState } from 'react';
import { getScreenData } from "../features/studentView/studentScreenSlice";
import templates from '../Components/CourseEditorComponents/Templates/StudentTemplate';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function StudentView() {

    const dispatch = useDispatch();
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("courseId");
    const [screenIndex, setScreenIndex] = useState(0);

    const { course, isError, message } = useSelector(
        (state) => state.studentCourse
    );

    const studentScreen = useSelector(
        (state) => state.studentScreen
    );

    useEffect(() => {
        dispatch(getCourseData(courseId));
    }, [courseId, dispatch,]);

    useEffect(() => {
        if (course.screens !== undefined) {
            dispatch(getScreenData(course.screens[screenIndex]));
        }

    }, [course, screenIndex, dispatch]);

    /**
     * This function handles the click on the "Weiter" Button. It increases the screenIndex by 1 and fetches the next screen
     */
    function handleWeiterButton() {
        if (screenIndex < course.screens.length) {
            setScreenIndex(screenIndex + 1)
            console.log("screenIndex: " + screenIndex);
        }
    }


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '70%', margin: 'auto', marginBottom: 4 }}>

                    {/* This is the stack for the main student View content The elements that get fetched into the Redux state "studentScreen" 
                     are getting mapped here and displayed inside this stack */}
                    <Stack spacing={3}>
                        {
                            (studentScreen.screen !== undefined) ? templates[`${studentScreen.screen.template}`] : <div>lol</div>
                        }
                        {/* Rest of the code */}
                        {/* This is the bottom stack for the progress Bar with continue Button */}

                        {studentScreen.screen.template !== 'End' ? (
                            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                                <Box sx={{ width: '80%' }}>
                                    <ProgressBar completed={60} />
                                </Box>
                                <Box sx={{ width: '20%', display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="contained" endIcon={<ArrowForwardIosIcon />} onClick={handleWeiterButton}>
                                        Weiter
                                    </Button>
                                </Box>
                            </Stack>
                        ) : (
                            <div></div>
                        )}


                    </Stack>
                </Box>
            </div>
        </div>
    );
}

export default StudentView;