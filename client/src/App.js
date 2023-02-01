import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import CourseOverview from './Pages/CourseOverview'
import Course from './Pages/Course'
import SignInSide from './Pages/SignInSide'
import Kursübersicht from './Pages/Kursuebersicht'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/kursuebersicht' element={<Kursübersicht />} />
          <Route path='/kurs' element={<Course />} />
          <Route path='/login' element={<SignInSide />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
