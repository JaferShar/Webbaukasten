import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CourseOverview from "./Pages/CourseOverview";
import Course from "./Pages/CourseEditor";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentView from "./Pages/StudentView";
import Profile from "./Pages/ProfileSettings";
/**
 * This module provides the main application, including the router that handles navigation between pages
 * and the toast container for displaying notifications.
 *
 * @returns the main application.
 */
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/kursuebersicht" element={<CourseOverview />} />
          <Route path="/kurs" element={<Course />} />
          <Route path="/" element={<Login />} />
          <Route path="/student/view" element={<StudentView />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}
export default App;
