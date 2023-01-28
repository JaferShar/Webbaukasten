import React from 'react';
// import CourseOverview from './Sites/CourseOverview' commented for the course view
import Course from './Sites/Course'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseOverview from './Sites/CourseOverview'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/kurs-uebersicht' element={<CourseOverview />} />
          <Route path='/kurs' element={<Course />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
