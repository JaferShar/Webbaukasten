import axios from "axios";

const API_URL = `api/student/course`;

const getCourseData = async (courseId, token) => {
    const response = await axios.get(API_URL + `/${courseId}`);
    return response.data;
};

const studentCourseService = {
    getCourseData,
};

export default studentCourseService;

