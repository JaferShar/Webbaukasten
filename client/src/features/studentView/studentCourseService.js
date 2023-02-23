import axios from "axios";
import { toast } from "react-toastify";

const getCourseData = async (courseId) => {
  try {
    const response = await axios.get("/api/student/course/" + courseId);
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

const studentCourseService = {
  getCourseData,
};

export default studentCourseService;
