import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService'

//Get user from local storage
const account = JSON.parse(localStorage.getItem('account'));

const initialState = {
    account: account ? account : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);    
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }   
    },
    extraReducers: () => {
        //TODO
    }   
})

export const {reset} = authSlice.actions
export default authSlice.reducer