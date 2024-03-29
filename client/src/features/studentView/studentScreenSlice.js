import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentScreenService from "./studentScreenService";

const initialState = {
  screen: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getScreenData = createAsyncThunk("getScreenData", async (screenId, thunkAPI) => {
  try {
    return studentScreenService.getScreenData(screenId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const studentScreenSlice = createSlice({
  name: "studentScreenData",
  initialState,
  reducers: {
    resetScreen: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScreenData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getScreenData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.screen = action.payload;
      })
      .addCase(getScreenData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.screen = {};
      })  },
});

export const { resetScreen } = studentScreenSlice.actions;
export default studentScreenSlice.reducer;
