import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseOverview from './Pages/CourseOverview'
import Course from './Pages/CourseEditor'
import Login from './Pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Test from './Components/CourseEditorComponents/FixComponents/Test';
import H5PTest from './Pages/H5PTest';
import H5PPage from './Pages/H5PTestFolder/H5PPage'
import PixabayTestPage from './Pages/PixabayTest/PixabayTestPage';
import StudentView from './Pages/StudentView';

// import PixabayTestPage from './Pages/PixabayTest/PixabayTestPage';
//  <Route path='/pixabay' element={<PixabayTestPage />}/>


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/h5p' element={<H5PPage/>}/>
          <Route path='/pixabay' element={<PixabayTestPage />}/>
          <Route path='/' element={<H5PTest />} />
          <Route path='/kursuebersicht' element={<CourseOverview />} />
          <Route path='/kurs' element={<Course />} />
          <Route path='/login' element={<Login />} />
          <Route path='/test' element={<Test />} />
          <Route path='/student/view' element={<StudentView />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}


export default App;
