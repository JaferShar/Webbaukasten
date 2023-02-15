import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import data from '../assets/DummyCourse.json';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function StudentView() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '70%', margin: 'auto' }}>
                    <Stack spacing={2}>
                        <h1>{data.courseName}</h1>
                        <Item>{data.screens[0].elements[0]}</Item>
                        <img src={data.screens[0].elements[1]} alt="description of the image" />
                    </Stack>
                </Box>
            </div>
        </div>
    );
}

export default StudentView;