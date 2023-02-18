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

    useEffect(() => {
        if (courseId) {
            dispatch(getCourseData(courseId));
        }
        
      }, [dispatch, courseId]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '70%', margin: 'auto', marginBottom: 4 }}>
                    <Stack spacing={3}>
                        <h1>{data.courseName} + {courseId}</h1>
                        <Item>{data.screens[0].elements[0]}</Item>
                        <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
                            <img src={data.screens[0].elements[1]} alt='description of the image' width="auto" height="auto" />
                        </div>
                        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems={"center"}>
                            <Box sx={{ width: '80%' }}>
                                <ProgressBar completed={60} />
                            </Box>
                            <Box sx={{ width: '20%', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>
                                    Weiter
                                </Button>
                            </Box>
                        </Stack>

                    </Stack>
                </Box>
            </div>
        </div>
    );
}

export default StudentView;