import {configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();


export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

