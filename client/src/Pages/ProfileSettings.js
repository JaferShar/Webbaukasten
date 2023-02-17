import React, { useState } from 'react';
import { Avatar, Button, Grid, TextField } from '@mui/material';

const ProfileSettings = () => {
  const [username, setUsername] = useState('');
  const [avatarImage, setAvatarImage] = useState(null);
  const [avatarInitials, setAvatarInitials] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarImage(null);
    setAvatarInitials(getInitials(username));
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return names
      .map((n) => n.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={handleUsernameChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <input
          accept="image/*"
          id="avatar-input"
          type="file"
          style={{ display: 'none' }}
          onChange={handleAvatarChange}
        />
        <label htmlFor="avatar-input">
          <Button variant="contained" component="span">
            {avatarImage ? 'Change' : 'Upload'} Avatar
          </Button>
        </label>
        {avatarImage && (
          <Button variant="outlined" onClick={handleRemoveAvatar}>
            Remove
          </Button>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <Avatar
          sx={{ width: 120, height: 120 }}
          alt={username}
          src={avatarImage}
        >
          {avatarInitials}
        </Avatar>
      </Grid>
    </Grid>
  );
};

export default ProfileSettings;
