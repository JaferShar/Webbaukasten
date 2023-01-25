import React from 'react';
// import CourseOverview from './Sites/CourseOverview' commented for the course view
import Course from './Sites/Course'
import { Route, Routes } from 'react-router-dom';
import CourseOverview from './Sites/CourseOverview'


function App() {
  return (
    <div>
      <Routes>
      <Route  path='/kurs-uebersicht' element={<CourseOverview />} />
        <Route  path='/kurs' element={<Course />} />
        
      </Routes>
    </div>
  );
}


export default App;
