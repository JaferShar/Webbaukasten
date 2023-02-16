import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function UploadBox() {
  const [file, setFile] = useState(null);

  function handleFileUpload(event) {
    setFile(URL.createObjectURL(event.target.files[0]));
  }

  function handlePixabayUpload() {
    window.open('https://pixabay.com/', '_blank');
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {file ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={file} alt="Selected file" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </Box>
      ) : (
        <Box
          sx={{
            border: '3px dotted grey',
            borderRadius: '10px',
            padding: '30px',
          }}
        >
          <Input
            type="file"
            id="file-input"
            onChange={handleFileUpload}
            inputProps={{ accept: 'image/*' }}
            sx={{ display: 'none' }}
          />
          <InputLabel htmlFor="file-input">
            <Button variant="contained" component="span" startIcon={<PhotoCamera />} onClick={handlePixabayUpload}>
              Pixabay
            </Button>
          </InputLabel>
        </Box>
      )}
    </Box>
  );
}
