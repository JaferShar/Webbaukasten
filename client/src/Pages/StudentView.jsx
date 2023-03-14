import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ProgressBar from "@ramonak/react-progress-bar";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { getCourseData } from "../features/studentView/studentCourseSlice";
import { useEffect } from 'react';
import { useState } from 'react';
import { getScreenData } from "../features/studentView/studentScreenSlice";
import templates from '../Components/StudentViewComponents/StudentTemplate.jsx';
import { resetScreen } from '../features/studentView/studentScreenSlice';
import StudentEndCard from '../Components/StudentViewComponents/Templates/StudentEndCard';


/**
 *StudentView is the main component for the student view. It fetches the course data from the backend and renders the course content.
 * It also handles the navigation between the screens.
 * Depending on the screen template, the corresponding template component is rendered.
 * 
 * @return {*} 
 */
function StudentView() {

    const dispatch = useDispatch();
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("courseId");
    const [screenIndex, setScreenIndex] = useState(0);

    const { course } = useSelector(
        (state) => state.studentCourse
    );

    const studentScreen = useSelector(
        (state) => state.studentScreen
    );

    useEffect(() => {
        dispatch(getCourseData(courseId));
    }, [courseId, dispatch,]);

    useEffect(() => {
        if (course.screens !== undefined && course.screens[screenIndex]) {
            dispatch(getScreenData(course.screens[screenIndex]));
        } else {
            dispatch(resetScreen());
        }

    }, [course, screenIndex, dispatch]);

    /**
     * This function handles the click on the "Weiter" Button. It increases the screenIndex by 1 and fetches the next screen
     */
    function handleWeiterButton() {
        if (screenIndex < course.screens.length) {
            setScreenIndex(screenIndex + 1)
        }
    }


    return (
        <div data-testid="studentView">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '70%', margin: 'auto', marginBottom: 4 }}>

                    {/* This is the stack for the main student View content The elements that get fetched into the Redux state "studentScreen" 
                     are getting mapped here and displayed inside this stack */}
                    <Stack spacing={3}>
                        {
                            (studentScreen.screen !== undefined) ? templates[`${studentScreen.screen.template}`] : <div>lol</div>
                        }
                        {/* Rest of the code */}
                        {/* This is the bottom stack for the progress Bar with continue Button 
                        This only renders if we are not on the End card screen
                        */}


                        {course.screens && screenIndex < course.screens.length ? (
                            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                                <Box sx={{ width: '80%' }}>
                                <div data-testid="progressBar">
                                    <ProgressBar completed={
                                        course.screens !== undefined
                                        ? Math.round((screenIndex  / (course.screens.length -1)) * 100)
                                        : 0
                                    }
                                 />
                                 </div>
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
            {/* This is the end card that gets rendered if we are on the last screen */}
            {course.screens && screenIndex === course.screens.length ? (
                <div data-testid="endCard">
                <StudentEndCard />
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default StudentView;