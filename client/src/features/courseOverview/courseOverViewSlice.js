import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    courses: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const courseOverViewSlice = createSlice({
    name: "courseOverview",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    
});

export const { reset } = courseOverViewSlice.actions;
export default courseOverViewSlice.reducer;
