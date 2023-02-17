import React, { useState } from "react";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import ProfileHeader from "../Components/ProfileHeader";
import {useSelector } from 'react-redux';
const ProfileSetting = () => {
 const { account } = useSelector((state) => state.auth);

  /* Platzhalter test
    const [account] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
   
  });
  */


  const [username, setUsername] = useState('');

  // Assume avatar is a string with the URL of the image
  const [avatar, setAvatar] = useState(
    "https://mui.com/static/images/avatar/1.jpg"
  );

  // Add a state variable to keep track of whether an image is selected or not
  const [imageSelected, setImageSelected] = useState(false);

  // Handle change of username input
  const handleUsernameChange = (event) => {
    //hier wird ausgelöst wenn update im username feld
    setUsername(event.target.value);
  };

  // Handle click of save button
  const handleSaveClick = () => {
    // Save the updated account and avatar to some backend service
    
  };

  // Handle file upload of avatar
  const handleUpload = (event) => {
    // Get the selected file from the event
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the file using URL.createObjectURL
      const url = URL.createObjectURL(file);
      setAvatar(url);
      setImageSelected(true); // Set imageSelected to true when a file is selected
    }
  };

  return (
    <div>
      <ProfileHeader></ProfileHeader>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={avatar} />
            </ListItemAvatar>
            <ListItemText />
          </ListItem>
          <ListItem>
            <ListItemText primary="First Name" secondary={account.firstName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name" secondary={account.lastName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={account.email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Username:" />
            <TextField value={username} onChange={handleUsernameChange} />
          </ListItem>
        </List>

        {/* Add a file input for uploading avatar */}
        {/* Hide the file name by setting display:none when imageSelected is true */}
        <input
          accept="image/*"
          id="avatar-upload"
          type="file"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <label htmlFor="avatar-upload">
          <Button
            variant="contained"
            color="primary"
            component="span"
            style={{ marginLeft: 10, marginRight: 10 }}>
            Upload Avatar
          </Button>

          <Button
            variant="contained"
            onClick={handleSaveClick}
            style={{ marginLeft: 10, marginRight: 10 }}>
            Save
          </Button>
        </label>
      </div>
    </div>
  );
};

export default ProfileSetting;
