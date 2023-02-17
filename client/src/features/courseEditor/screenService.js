import axios from "axios";

const API_URL = `api/screen`

const getScreen = async (screenId, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(API_URL + `/${screenId}` , config);
    return response.data;
};

const createScreen = async (screenData, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(API_URL + `/${screenData.courseId}`, screenData, config);
    return response.data;
};

const courseEditorService = {
    getScreen,
    createScreen,
};


export default courseEditorService;

