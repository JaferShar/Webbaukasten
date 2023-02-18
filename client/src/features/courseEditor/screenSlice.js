import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import screenService from "../courseEditor/screenService";

const initialState = {
  screen: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getScreen = createAsyncThunk("getScreen", async (screenId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return screenService.getScreen(screenId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createScreen = createAsyncThunk("/createScreen", async (screenData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return screenService.createScreen(screenData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const setTextField = createAsyncThunk("/setTextField", async (screenData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return screenService.setTextField(screenData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const screenSlice = createSlice({
  name: "screenEditor",
  initialState,
  reducers: {
    resetScreen: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScreen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getScreen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.screen = action.payload;
      })
      .addCase(getScreen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.screen = {};
      })
      .addCase(createScreen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createScreen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.screen = action.payload;
      })
      .addCase(createScreen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setTextField.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setTextField.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.screen = action.payload;
      })
      .addCase(setTextField.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { resetScreen } = screenSlice.actions;
export default screenSlice.reducer;
