import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseOverview from './Pages/CourseOverview'
import Course from './Pages/Course'
import SignInSide from './Pages/SignInSide'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/kursuebersicht' element={<CourseOverview />} />
          <Route path='/kurs' element={<Course />} />
          <Route path='/login' element={<SignInSide />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
