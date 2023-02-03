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
    }
    try {
        const response = await Axios.post(API_URL, bodyParameters, config);
        console.log(response.data)
        return response.data;
    }
    catch (error) {
        console.log(error)
        console.log(error.message)
        toast.error(error)
    }
}

const overviewService = {
    createCourse
};

export default overviewService