import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import screenService from "../courseEditor/screenService";

const initialState = {
  screen: {template: "Welcome"},
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

export const screenSlice = createSlice({
  name: "screenEditor",
  initialState,
  reducers: {
    reset: (state) => initialState,
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
  },
});

export const { reset } = screenSlice.actions;
export default screenSlice.reducer;
