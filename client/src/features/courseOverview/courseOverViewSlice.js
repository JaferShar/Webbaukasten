import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseOverViewService from "../courseOverview/courseOverViewService";

const initialState = {
  coursesState: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// function that creates a new course.
export const createCourse = createAsyncThunk(
  "",
  async (courseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.account.token;
      return await courseOverViewService.createCourse(courseData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// function that retrieves all courses.
export const getAllCourses = createAsyncThunk("/all", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return await courseOverViewService.getAllCourses(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// function that deletes a course.
export const deleteCourse = createAsyncThunk(
  "/delete",
  async (courseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.account.token;
      return await courseOverViewService.deleteCourse(courseId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// function that renames a new course.
export const renameCourse = createAsyncThunk(
  "/rename",
  async (courseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.account.token;
      return await courseOverViewService.renameCourse(courseData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// function that shares a new course.
export const shareCourse = createAsyncThunk("/share", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return await courseOverViewService.shareCourse(data, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
    //return thunkAPI.rejectWithValue(message);
  }
});
// represents a slice of the Redux store for managing course overview data.
export const courseOverViewSlice = createSlice({
  name: "courseOverview",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coursesState.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getAllCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coursesState = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coursesState = state.coursesState.filter(
          (course) => course._id !== action.payload.id
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(renameCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(renameCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coursesState = state.coursesState.map((course) =>
          course._id === action.payload._id
            ? { ...course, courseName: action.payload.courseName }
            : course
        );
      })
      .addCase(renameCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = courseOverViewSlice.actions;
export default courseOverViewSlice.reducer;
