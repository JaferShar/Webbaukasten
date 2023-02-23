import axios from "axios";
import { toast } from "react-toastify";

const getScreenData = async (screenId, token) => {
  try {
    const response = await axios.get("/api/student/screen/" + screenId);
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
  getScreenData,
};

export default courseEditorService;
