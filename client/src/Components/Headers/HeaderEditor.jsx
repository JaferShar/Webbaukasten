import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { logout, reset } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import HomeIcon from "@mui/icons-material/Home";
import { toast } from "react-toastify";
import {
  resetScreen,
  updateScreen,
} from "../../features/courseEditor/screenSlice";
import { resetCourse } from "../../features/courseEditor/courseSlice";

const settings = ["Profile", "Logout"];
/**
 * This module delivers a responsive app bar component for a course.
 * It displays save and home buttons as well as user settings menu.
 *
 * @param {*} { 
 *   searchTerm, The current search term in the search bar.
 *   onSearch, The function to call when the search term changes.
 *   handleSearch, The function to call when the user submits a search.
 * }
 * @returns responsive app bar for a course.
 */
function ResponsiveAppBar({ searchTerm, onSearch, handleSearch }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.auth);
  const screen = useSelector((state) => state.screenEditor.screen);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async (clickedSetting) => {
    if (clickedSetting === "Logout") {
      localStorage.removeItem("account");
      await dispatch(reset());
      await dispatch(logout());
      navigate("/login");
    } else if (clickedSetting === "Profile") {
      navigate(`/profile?accountID=${account._id}`);
    }
    setAnchorElUser(null);
  };

  const handleSafe = () => {
    try {
      if (!screen._id) {
        toast.error("Please select a screen first.");
        return;
      } else if (screen.elements.length === 0) {
        toast.error("Please add elements to the screen first.");
        return;
      }
      dispatch(
        updateScreen({ screenId: screen._id, elements: screen.elements })
      );
      toast.success("Your changes have been saved.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClickHome = () => {
    dispatch(resetScreen());
    dispatch(resetCourse());
    navigate("/kursuebersicht");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <Box display="flex" flexGrow={1}>
            <h1 style={{ color: "white" }}>Kurs</h1>
          </Box>
          <div style={{ marginRight: "40px" }}>
            <CloudDoneIcon onClick={handleSafe} style={{ cursor: "pointer" }} />
          </div>
          <div style={{ marginRight: "40px" }}>
            <HomeIcon onClick={handleClickHome} style={{ cursor: "pointer" }} />
          </div>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={account ? account.picture : ""}
                  referrerPolicy="no-referrer"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
