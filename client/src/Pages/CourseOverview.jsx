import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Avatar, Button, IconButton, Grid } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../Styling/PageStyling/CourseOverview.css";
import { toast } from "react-toastify";
import MoreVertMenu from "../Components/CourseOverviewComponents/MoreVertMenu";
import ResponsiveAppBar from "../Components/Headers/ResponsiveAppBar";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourse,
  getAllCourses,
  deleteCourse,
  renameCourse,
  shareCourse,
} from "../features/courseOverview/courseOverViewSlice";
import { useEffect } from "react";
import { getCourse, resetCourse } from "../features/courseEditor/courseSlice";
import { getScreen, resetScreen } from "../features/courseEditor/screenSlice";
/**
 * This component provides the course overview page.
 * It displays a list of courses and allows the user to create, rename, delete, share, and publish courses. 
 *
 * @returns the course overview page.
 */
export default function CourseOverview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCourseId, setSelectedCourseId] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  const { account } = useSelector((state) => state.auth);
  const { coursesState, isError, message } = useSelector(
    (state) => state.courseOverview
  );
  const { course } = useSelector((state) => state.courseEditor);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClickMoreVertIcon = (event, courseId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourseId(courseId);
  };

  useEffect(() => {
    try {
      if (!account) {
        navigate("/login");
        return;
      }
      dispatch(getAllCourses());
      dispatch(resetCourse());
      dispatch(resetScreen());
    } catch (error) {
      toast("Kurse konnten nicht geladen werden", { type: "error" });
    }
  }, [account, navigate, dispatch, isError, message, course]);

  const handleCreateCourse = async () => {
    const existingCourseNames = new Set(
      coursesState.map((course) => course.courseName)
    );
    let counter = 1;
    let courseName = "neuer Kurs";

    while (existingCourseNames.has(courseName)) {
      courseName = `neuer Kurs ${counter++}`;
    }

    try {
      dispatch(createCourse({ courseName }));
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteCourse(selectedCourseId));
    } catch (error) {
      toast(error.message, { type: "error" });
    } finally {
      handleClose();
    }
  };

  const handleRename = async (newName) => {
    try {
      const changeCourse = coursesState.find(
        (course) => course._id === selectedCourseId
      );
      if (changeCourse.courseName === newName) {
        handleClose();
        return;
      }
      const exist = coursesState.find(
        (course) => course.courseName === newName
      );
      if (exist) {
        throw new Error("Kursname existiert bereits");
      }
      const courseData = {
        courseId: selectedCourseId,
        courseName: newName,
      };
      dispatch(renameCourse(courseData));
    } catch (error) {
      toast(error.message, { type: "error" });
    } finally {
      handleClose();
    }
  };

  const handleShare = async (email) => {
    try {
      dispatch(shareCourse({ courseId: selectedCourseId, email: email }));
      dispatch(getAllCourses());
      toast.success("course was shared with " + email);
    } catch (error) {
      toast(error.message, { type: "error" });
    } finally {
      handleClose();
    }
  };

  const handlePublish = async () => {
    try {
      const pageUrl = new URL(
        `/student/view?courseId=${selectedCourseId}`,
        window.location.origin
      ).href;
      navigator.clipboard.writeText(pageUrl);
      toast.success("URL was copied to clipboard");
    } catch (error) {
      toast(error.message, { type: "error" });
    } finally {
      handleClose();
    }
  };

  const handleListItemClick = async (courseId) => {
    dispatch(getCourse(courseId));
    const selectedCourse = coursesState.find(
      (course) => course._id === courseId
    );
    navigate(`/kurs?courseId=${courseId}`);
  };

  return (
    <div>
      <ResponsiveAppBar handleSearch={handleSearch} searchTerm={searchTerm} />
      <Box b={1} mt={5} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} sm={6}>
          <List>
            {coursesState
              .filter((course) =>
                course.courseName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((course) => (
                <ListItemButton
                  key={course._id}
                  onClick={() => handleListItemClick(course._id)}
                  sx={{ py: 2 }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={course.courseName} />
                  <Box sx={{ ml: "auto" }}>
                    <IconButton
                      edge="end"
                      aria-label="more"
                      onClick={(event) => {
                        event.stopPropagation(); // stop the event from propagating to the parent
                        handleClickMoreVertIcon(event, course._id);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </ListItemButton>
              ))}
          </List>
        </Grid>
      </Box>
      <MoreVertMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleShare={handleShare}
        handlePublish={handlePublish}
        handleRename={handleRename}
      />
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateCourse}
        >
          <AddIcon />
          Kurs erstellen
        </Button>
      </Box>
    </div>
  );
}
