import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

export default function TemplateContainer() {
  return (
    <div className="TemplateContainer">
      Template Menu
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Stack spacing={4}>
          <Paper elevation={3} style={{ width: '100%', height: '60px' }}>
            Wilkommen Template
          </Paper>
          <Paper elevation={3} style={{ width: '100%', height: '60px' }}>
            Standard Template
          </Paper>
          <Paper elevation={3} style={{ width: '100%', height: '60px' }}>
            Ende Template
          </Paper>
        </Stack>
      </Box>
    </div>
  );
}
