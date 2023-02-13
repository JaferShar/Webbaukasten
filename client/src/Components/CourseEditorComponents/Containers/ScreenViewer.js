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
import TitleIcon from "@mui/icons-material/Title";
import ExplicitIcon from "@mui/icons-material/Explicit";
import AddScreenMenu from "../Menus/AddScreenMenu";
import { useDispatch, useSelector } from "react-redux";
import { createScreen, deleteScreen } from "../../../features/courseEditor/courseSlice";
import { toast } from "react-toastify";
import DeleteScreenMenu from "../Menus/DeleteScreenMenu";

function AddScreenItem({ onAddClick }) {
  return (
    <ListItemButton onClick={onAddClick} className="rectangle-list-item">
      <NoteAdd style={{ fontSize: 100 }} />
    </ListItemButton>
  );
}

function ScreenViewer({ changeTemplate }) {
  const screens = useSelector((state) => state.courseEditor.course.screens);
  const course = useSelector((state) => state.courseEditor.course);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState(null);

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

  const handleContextMenu = (event, screen) => {
    event.preventDefault();
    setDeleteAnchorEl(event.currentTarget);
    setSelectedScreen(screen);
  };

  const handleCloseContextMenu = () => {
    setDeleteAnchorEl(null);
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
            screens.map((screen, index) => (
              <ListItemButton
                key={screen}
                className="rectangle-list-item"
                style={{ flexDirection: "column", border: "1px solid #d9dddd", cursor: 'context-menu' }}
                sx={{ mb: 2 }}
                onClick={() => {}}
                onContextMenu={(event) => {
                  handleContextMenu(event, screen);
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
