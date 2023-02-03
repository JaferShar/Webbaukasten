import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
export const register = createAsyncThunk('auth/register', async (account, thunkAPI) => {
    try {
        return await authService.register(account);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//Logout user
export const logout = createAsyncThunk('auth/logout',
async () => {
    await authService.logout()
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
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.account = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.account = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.account = null;
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer