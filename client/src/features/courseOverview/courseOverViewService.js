import axios from "axios";

const API_URL = "api/course";

const createCourse = async (courseData, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(API_URL, courseData, config);
    return response.data;
};

const getAllCourses = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(API_URL + '/all', config);
    return response.data;    
};



const courseOverviewService = {
    createCourse,
    getAllCourses,

};


export default courseOverviewService;

