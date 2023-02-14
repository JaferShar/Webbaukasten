import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Styling/SiteStyling/ScreenViewer.css";
import Article from "@mui/icons-material/Article";
import NoteAdd from "@mui/icons-material/NoteAdd";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Grid,
} from "@mui/material";
import AddScreenMenu from "../Menus/AddScreenMenu";
import { useDispatch, useSelector } from "react-redux";
import { createScreen, deleteScreen } from "../../../features/courseEditor/courseSlice";
import { getScreen } from "../../../features/courseEditor/screenSlice";
import { getCourse } from "../../../features/courseEditor/courseSlice";
import { toast } from "react-toastify";
import DeleteScreenMenu from "../Menus/DeleteScreenMenu";

/**
 * This Module is responsible for displaying an add screen button in the Screen Viewer.
 * 
 * @param {*} onAddClick This is a callback function that handles the logic for clicking the add screen button.
 * @returns Item that displays an add screen button.
 */
function AddScreenItem({ onAddClick }) {
  return (
    <ListItemButton onClick={onAddClick} className="rectangle-list-item">
      <NoteAdd style={{ fontSize: 100 }} />
    </ListItemButton>
  );
}

/**
 * This Module is responsible for displaying the screens of a course in the Screen Viewer.
 * 
 * @param {*} changeTemplate This is a callback function that handles the logic for changing a displayed screen template. 
 * @returns List of screens.
 */
function ScreenViewer({ changeTemplate }) {
  const screens = useSelector((state) => state.courseEditor.course.screens);
  const course = useSelector((state) => state.courseEditor.course);
  const screen = useSelector((state) => state.screenEditor.screen);
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("courseId");
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState(null);

  useEffect(() => {
    dispatch(getCourse(courseId));
  }, [dispatch, courseId]);

  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch(deleteScreen({ courseId: course._id, screenId: selectedScreen }));
    handleCloseContextMenu();
  };

  /**
   * This method creates a new screen based on the template selected.
   * It handles the logic for clicking the AddScreenMenu component.
   * 
   * @param {*} template the template of the screen to be created.
   */
  const handleCreate = (template) => {
    try {
      if (template === "Welcome") {
        throw new Error("Welcome screen cannot be created");
      }
      dispatch(createScreen({ template: template, courseId: course._id }));
      changeTemplate(template);
    } catch (error) {
      toast(error.message, { type: "error" });
    } finally {
      handleClose();
    }
  };

  const handleContextMenu = (event, screenId) => {
    event.preventDefault();
    setDeleteAnchorEl(event.currentTarget);
    setSelectedScreen(screenId);
  };

  const handleCloseContextMenu = () => {
    setDeleteAnchorEl(null);
  };

  const handleOnClickScreen = (screenId) => {
    dispatch(getScreen(screenId));
    changeTemplate(screen.template);
  };

  return (
    <Grid className="ScreenViewer">
      <Paper
        style={{
          display: "flex",
          justifyContent: "center",
          maxHeight: "100%",
          maxWidth: "100%",
          overflow: "auto",
        }}
      >
        <List>
          {screens &&
            screens.map((screenId, index) => (
              <ListItemButton
                key={screenId}
                className="rectangle-list-item"
                style={{ flexDirection: "column", border: "1px solid #d9dddd", cursor: 'context-menu' }}
                sx={{ mb: 2 }}
                onClick={() => 
                  handleOnClickScreen(screenId)}
                onContextMenu={(event) => {
                  handleContextMenu(event, screenId);
                }}
              >
                <Article style={{ fontSize: 100 }} />
                <ListItemText
                  primaryTypographyProps={{ variant: "body2" }}
                  primary={index + 1}
                  style={{ marginTop: "60px" }}
                />
              </ListItemButton>
            ))}
          <AddScreenItem
            onAddClick={(event) => {
              handleAddClick(event);
            }}
          />
          <ListItem style={{ display: "none" }} />
        </List>
      </Paper>
      <DeleteScreenMenu
        anchorEl={deleteAnchorEl}
        handleClose={handleCloseContextMenu}
        handleDelete={handleDelete}
      />
      <AddScreenMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleCreate={handleCreate}
      />
    </Grid>
  );
}

export default ScreenViewer;
