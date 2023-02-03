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
      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error('Unerwarteter Response-Status');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

const deleteCourse = async (courseId) => {
    try {
        const response = await Axios.delete(`${API_URL}/${courseId}`, config);
        return response.data;
    } catch (error) { 
        toast.error(error.message)
    }
}


const overviewService = {
    createCourse
};

export default overviewService