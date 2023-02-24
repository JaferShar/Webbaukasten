import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `api/course`;
const SCREEN_URL = `api/screen`;
/**
 * Asynchronous function that retrieves course data from the server.
 *
 * @param {*} courseId the ID of the course to retrieve.
 * @param {*} token the authentication token required for access.
 * @returns a promise that resolves the response data obtained from the API when the course is successfully retrieved.
 */
const getCourse = async (courseId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(API_URL + `/${courseId}`, config);
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
 * Asynchronous function that deletes a screen from a course.
 *
 * @param {*} screenData object containing the courseId and screenId of the screen to delete.
 * @param {*} token the authentication token required for access.
 * @returns a promise that resolves the response data obtained from the API when the course is successfully deleted.
 */
const deleteScreen = async (screenData, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.delete(
      SCREEN_URL +
        `?param1=${screenData.courseId}&param2=${screenData.screenId}`,
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
  getCourse,
  deleteScreen,
};

export default courseEditorService;
