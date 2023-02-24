import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `api/screen`;
const ELEMENT_URL = `api/element`;

/**
 * Fetches a screen by its ID from the server.
 *
 * @param {*} screenId The ID of the screen to fetch.
 * @param {*} token  The user's authentication token.
 * @returns the data for the screen with the specified id.
 */
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

/**
 * Creates a new screen for a given course.
 *
 * @param {*} screenData The data for the screen being created.
 * @param {*} token  The user's authentication token.
 * @returns the created screen data.
 */
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

/**
 * Creates a new textfield element on a screen.
 *
 * @param {*} screenData The screen data including the screen id and the textfield element data.
 * @param {*} token The user's authentication token.
 * @returns The data of the created textfield element.
 */
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

/**
 * Sets the H5P content of a screen.
 *
 * @param {*} screenData An object containing the screen ID and the H5P data.
 * @param {*} token The access token for authentication.
 * @returns the response data.
 */
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

/**
 * Sets a picture element for a screen.
 *
 * @param {*} screenData The data of the screen and picture element
 * @param {*} token
 * @returns the response data.
 */
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

/**
 * Updates a screen with the given screenData.
 *
 * @param {*} screenData The data of the screen to update.
 * @param {*} token The authorization token.
 * @returns the updated screen data.
 */
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

/**
 * Exchanges an element in a screen with a previous element.
 *
 * @param {*} elementData The data for the element to be exchanged.
 * @param {*} token The authorization token.
 * @returns the response data.
 */
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
/**
 * Deletes an element from a screen.
 *
 * @param {*} elementData The data of the element to delete.
 * @param {*} token The authorization token.
 * @returns the response data.
 */
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
