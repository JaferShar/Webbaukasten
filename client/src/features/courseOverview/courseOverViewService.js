import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "api/course";
/**
 * Creates a new course on the server using the provided courseData and user token.
 *
 * @param {*} courseData the data of the course to be created.
 * @param {*} token the user token for authorization.
 * @returns  A Promise that resolves to the created course data.
 */
const createCourse = async (courseData, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(API_URL, courseData, config);
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
 * Fetches all courses from the server.
 *
 * @param {*} token user authentication token
 * @returns a promise that resolves to an array of all courses.
 */
const getAllCourses = async (token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(API_URL + "/all", config);
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
 * Deletes a course with the specified ID from the server.
 *
 * @param {*} courseId the ID of the course to delete.
 * @param {*} token
 * @returns the data of the deleted course from the server.
 */
const deleteCourse = async (courseId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.delete(API_URL + `/${courseId}`, config);
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
 * Renames a course with the given courseId using the provided courseData and token.
 *
 * @param {*} courseData The new data for the course, including courseId, name, and description.
 * @param {*} token The user's authentication token.
 * @returns the data of the updated course.
 */
const renameCourse = async (courseData, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.put(
      API_URL + `/${courseData.courseId}`,
      courseData,
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
 * Shares a course with other users.
 *
 * @param {*} data The data of the course to share, including the course ID and a list of user IDs to share it with.
 * @param {*} token The user's authentication token.
 * @returns  a promise that resolves to the data of the response from the server
 */
const shareCourse = async (data, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(
      API_URL + `/share/${data.courseId}`,
      data,
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

const courseOverviewService = {
  createCourse,
  renameCourse,
  getAllCourses,
  deleteCourse,
  shareCourse,
};

export default courseOverviewService;
