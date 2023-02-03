import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseOverview from './Pages/CourseOverview'
import Course from './Pages/Course'
import Login from './Pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/kursuebersicht' element={<CourseOverview />} />
          <Route path='/kurs' element={<Course />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}


export default App;
