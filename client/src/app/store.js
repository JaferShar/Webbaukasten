import {configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import courseOverViewReducer from '../features/courseOverview/courseOverViewSlice';
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();


export const store = configureStore({
    reducer: {
        auth: authReducer,
        courseOverview: courseOverViewReducer,
    },
});

