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
import { createScreen } from "../../../features/courseEditor/courseSlice";

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

  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreate = (template) => {
    try {
      dispatch(createScreen({ template: template, courseId: course._id }));
      changeTemplate(template);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
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
                style={{ flexDirection: "column", border: "1px solid #d9dddd" }}
                sx={{ mb: 2 }}
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
          <ListItem sytele={{ display: "none" }} />
        </List>
      </Paper>
      <AddScreenMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleCreate={handleCreate}
      />
    </Grid>
  );
}

export default ScreenViewer;
