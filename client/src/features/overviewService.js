import Axios from "axios";  
import { toast } from 'react-toastify';

const API_URL = "api/course";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGQyNmQwODUzODQ0NGJlZTE4MmVlNyIsImlhdCI6MTY3NTQzNzc3NiwiZXhwIjoxNjc4MDI5Nzc2fQ.E8hJPS8v4ZgNVG6dRG9Ym8eC_-NLzWZBKJ1qBbzZr0Y'

const config = {
    headers: {
        'Authorization': `Bearer ${token}` 
    }
}

// tested
const createCourse = async (courseData) => {
    const bodyParameters = {
      courseName: courseData,
    }; 
    try {
      const response = await Axios.post(API_URL, bodyParameters, config);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };  


const deleteCourse = async (courseId) => {
  await Axios.delete(`${API_URL}/${courseId}`, config).catch((error) => {
    throw new Error(error.response.data.error)});
};

// tested
const getAllCourses = async () => {
  try {
    const response = await Axios.get(`${API_URL}/all`, config);
    return response.data.courses.map(course => ({id: course._id, cName: course.courseName}));
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// tested
const updateCourse = async (courseId, newName) => {
  const bodyParameters = {
    courseName: newName,
  };
  await Axios.put(`${API_URL}/${courseId}`, bodyParameters, config).catch((error) => {
    throw new Error(error.response.data.error)});
};
  


const overviewService = {
    createCourse,
    deleteCourse,
    getAllCourses,
    updateCourse,
};

export default overviewService