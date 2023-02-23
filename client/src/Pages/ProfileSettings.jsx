import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ProfileHeader from "../Components/Headers/ProfileHeader";
import { useSelector } from "react-redux";
const ProfileSetting = () => {
  const { account } = useSelector((state) => state.auth);
  const [setAnchorElUser] = React.useState(null);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <div>
      <ProfileHeader></ProfileHeader>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                alt="Remy Sharp"
                src={account ? account.picture : ""}
                referrerPolicy="no-referrer"
              />
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
        </List>
      </div>
    </div>
  );
};

export default ProfileSetting;
