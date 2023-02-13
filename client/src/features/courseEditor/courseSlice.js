import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseEditorService from "../courseEditor/courseService";

const initialState = {
  course: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getCourse = createAsyncThunk("get", async (courseId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return courseEditorService.getCourse(courseId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createScreen = createAsyncThunk("/create", async (screenData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return courseEditorService.createScreen(screenData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteScreen = createAsyncThunk("/delete", async (screenData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return courseEditorService.deleteScreen(screenData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const courseSlice = createSlice({
  name: "courseEditor",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload;
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.course = {};
      })
      .addCase(createScreen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createScreen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload;
      })
      .addCase(createScreen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteScreen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteScreen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload;
      })
      .addCase(deleteScreen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;
