import axios from "axios";

const API_URL = `api/student/screen`

const getScreenData = async (screenId, token) => {
    const response = await axios.get(API_URL + `/${screenId}`);
    return response.data;
};

const courseEditorService = {
    getScreenData,
};

export default courseEditorService;

