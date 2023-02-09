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

const deleteCourse = async (courseId, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}`},
    };
    const response = await axios.delete(API_URL + `/${courseId}`, config)
    return response.data;
}

const renameCourse = async (courseData, token) => {
    console.log(courseData.courseId, courseData.courseName, 'insieskdjfaklsgkjakjahdfgiah')
    const config = {
        headers: { Authorization: `Bearer ${token}`},
    };
    const response = await axios.put(API_URL + `/${courseData.courseId}`, courseData, config)
    return response.data;
}




const courseOverviewService = {
    createCourse,

    renameCourse,    getAllCourses,
    deleteCourse,
};


export default courseOverviewService;

