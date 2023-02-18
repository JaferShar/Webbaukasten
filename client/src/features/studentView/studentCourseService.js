import axios from "axios";

const getCourseData = async (courseId) => {
    const response = await axios.get("/api/student/course/" + courseId);
    console.log("response.data: ", response.data);
    return response.data;
};

const studentCourseService = {
    getCourseData,
};

export default studentCourseService;
