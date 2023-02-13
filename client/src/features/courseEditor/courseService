import axios from "axios";

const API_URL = `api/course/`;

const getCourse = async (courseId, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(API_URL + `/${courseId}` , config);
    return response.data;
};



const courseEditorService = {
    getCourse,
};


export default courseEditorService;

