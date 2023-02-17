import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentCourseService from "./studentCourseService"

const initialState = {
  course: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getCourseData = createAsyncThunk("getCourseData", async (courseId, thunkAPI) => {
  try {
    return studentCourseService.getCourseData(courseId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const courseSlice = createSlice({
  name: "studentCourseData",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload;
      })
      .addCase(getCourseData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.course = {};
      })
  },
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;
