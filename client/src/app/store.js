import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import courseOverViewReducer from "../features/courseOverview/courseOverViewSlice";
import courseEditorReducer from "../features/courseEditor/courseSlice";
import screenReudcer from "../features/courseEditor/screenSlice";
import studentCourseReducer from "../features/studentView/studentCourseSlice";
import studentScreenReducer from "../features/studentView/studentScreenSlice";
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
/** 
 * Creates a Redux store with multiple reducers that handle the various component states.
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    courseOverview: courseOverViewReducer,
    courseEditor: courseEditorReducer,
    screenEditor: screenReudcer,
    studentCourse: studentCourseReducer,
    studentScreen: studentScreenReducer,
  },
});
