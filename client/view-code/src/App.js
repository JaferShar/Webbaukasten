import React from 'react';
// import CourseOverview from './Sites/CourseOverview' commented for the course view
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseOverview from './Sites/CourseOverview'
import Course from './Sites/Course'
import Login from './Sites/Login'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/kurs-uebersicht' element={<CourseOverview />} />
          <Route path='/kurs' element={<Course />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
