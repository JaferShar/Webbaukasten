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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * This component displays the user's profile information, including their
 * profile picture, first name, last name, and email. 
 *
 * @returns the user's profile information.
 */
const ProfileSetting = () => {
  const { account } = useSelector((state) => state.auth);
  const [setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  useEffect(() => {
    if (!account) {
      navigate("/login");
      return;
    }
  }, [account, navigate]);

  if (account) {
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
  } else {
    <div>
    </div>
  }

  
};

export default ProfileSetting;
