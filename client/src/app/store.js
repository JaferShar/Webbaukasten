import {configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import courseOverViewReducer from '../features/courseOverview/courseOverViewSlice';
import courseEditorReducer from '../features/courseEditor/courseSlice';
import screenReudcer from '../features/courseEditor/screenSlice';
import studentCourseReducer from '../features/studentView/studentCourseSlice';
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();


export const store = configureStore({
    reducer: {
        auth: authReducer,
        courseOverview: courseOverViewReducer,
        courseEditor: courseEditorReducer,
        screenEditor: screenReudcer,
        studentCourse: studentCourseReducer,
    },
});