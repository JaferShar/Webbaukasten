import Axios from "axios";  
import { toast } from 'react-toastify';

const API_URL = "api/course";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGQyNmQwODUzODQ0NGJlZTE4MmVlNyIsImlhdCI6MTY3NTQzNzc3NiwiZXhwIjoxNjc4MDI5Nzc2fQ.E8hJPS8v4ZgNVG6dRG9Ym8eC_-NLzWZBKJ1qBbzZr0Y'

const config = {
    headers: {
        'Authorization': `Bearer ${token}` 
    }
}

const createCourse = async (courseData) => {
    const bodyParameters = {
      courseName: courseData,
    };
  
    try {
      const response = await Axios.post(API_URL, bodyParameters, config);
  
      if (response.status !== 201) {
        throw new Error('Unerwarteter Response-Status');
      }
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };  

  const deleteCourse = async (courseId) => {
    try {
      const response = await Axios.delete(`${API_URL}/${courseId}`, config);
  
      if (response.status !== 200) {
        throw new Error('Kurs konnte nicht gelöscht werden');
      }
  
      return response.status;
    } catch (error) {
      throw error;
    }
};

const getAllCourses = async () => {
    try {
        const response = await Axios.get(`${API_URL}/all`, config);
        if (response.status !== 200) {
            throw new Error('Could not get courses');
        }
        const courses = response.data.courses.map(course => ({id: course._id, cName: course.courseName}));
        return courses;
    } catch (error) {
        throw error;
    }
}

const overviewService = {
    createCourse,
    deleteCourse,
    getAllCourses
};

export default overviewService