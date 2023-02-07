import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseOverViewService from "../courseOverview/courseOverViewService";

const initialState = {
    courses: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

// create new course
export const createCourse = createAsyncThunk('', async (courseData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.account.token;
        return await courseOverViewService.createCourse(courseData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


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
            state.courses.push(action.payload);
        })
        .addCase(createCourse.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        }
        );
    },
    
});

export const { reset } = courseOverViewSlice.actions;
export default courseOverViewSlice.reducer;
