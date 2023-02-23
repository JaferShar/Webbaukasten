import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `api/screen`;
const ELEMENT_URL = `api/element`;

const getScreen = async (screenId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(API_URL + `/${screenId}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      toast.error("Something went wrong, try again later");
      throw new Error("Something went wrong, try again later");
    }
  }
};

const createScreen = async (screenData, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(
      API_URL + `/${screenData.courseId}`,
      screenData,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      toast.error("Something went wrong, try again later");
      throw new Error("Something went wrong, try again later");
    }
  }
};

const setTextField = async (screenData, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(
      ELEMENT_URL + `/textfield/${screenData.screenId}`,
      screenData,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      toast.error("Something went wrong, try again later");
      throw new Error("Something went wrong, try again later");
    }
  }
};

const setH5P = async (screenData, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(
      ELEMENT_URL + `/h5p/${screenData.screenId}`,
      screenData,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      toast.error("Something went wrong, try again later");
      throw new Error("Something went wrong, try again later");
    }
  }
};

const setPicture = async (screenData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      ELEMENT_URL + `/picture/${screenData.screenId}`,
      screenData,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      toast.error("Something went wrong, try again later");
      throw new Error("Something went wrong, try again later");
    }
  }
};

const updateScreen = async (screenData, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.put(
      API_URL + `?param1=${screenData.screenId}`,
      screenData,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      toast.error("Something went wrong, try again later");
      throw new Error("Something went wrong, try again later");
    }
  }
};

const exchangeElement = async (elementData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post(
      ELEMENT_URL +
        `/?param1=${elementData.screenId}&param2=${elementData.prevElementId}`,
      elementData,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      toast.error("Something went wrong, try again later");
      throw new Error("Something went wrong, try again later");
    }
  }
};

const deleteElement = async (elementData, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.delete(
      ELEMENT_URL +
        `?param1=${elementData.screenId}&param2=${elementData.elementId}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      toast.error("Something went wrong, try again later");
      throw new Error("Something went wrong, try again later");
    }
  }
};

const courseEditorService = {
  getScreen,
  createScreen,
  setTextField,
  setH5P,
  setPicture,
  updateScreen,
  exchangeElement,
  deleteElement,
};

export default courseEditorService;
