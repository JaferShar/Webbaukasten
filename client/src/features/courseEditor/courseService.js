import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `api/course`;
const SCREEN_URL = `api/screen`;

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
