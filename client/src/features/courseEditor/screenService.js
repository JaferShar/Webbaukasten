import axios from "axios";

const API_URL = `api/screen`
const ELEMENT_URL = `api/element`

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

const setTextField = async (screenData, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(ELEMENT_URL + `/textfield/${screenData.screenId}`, screenData, config);
    return response.data;
};

const setH5P = async (screenData, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(ELEMENT_URL + `/h5p/${screenData.screenId}`, screenData, config);
    return response.data;
};

const setPicture = async (screenData, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(ELEMENT_URL + `/picture/${screenData.screenId}`, screenData, config);
    return response.data;
};

const updateScreen = async (screenData, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.put(API_URL + `?param1=${screenData.screenId}`, screenData, config);
    return response.data;
};

const courseEditorService = {
    getScreen,
    createScreen,
    setTextField,
    setH5P,
    setPicture,
    updateScreen,
};


export default courseEditorService;

