import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function UploadBox() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreviewUrl(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {selectedFile ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={previewUrl} alt={selectedFile && selectedFile.name} />
          
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
            <Button variant="contained" component="span" startIcon={<PhotoCamera />}>
              Upload
            </Button>
          </InputLabel>
        </Box>
      )}
    </Box>
  );
}
