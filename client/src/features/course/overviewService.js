import Axios from "axios";

const API_URL = "api/course";
const account = JSON.parse(localStorage.getItem("account"));

const config = {
    headers: {
        'Authorization': `Bearer ${account.token}` 
    }
}

// tested
const createCourse = async (courseData) => {
    const bodyParameters = {
      courseName: courseData,
    }; 
    try {
      const response = await Axios.post(API_URL, bodyParameters, config);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };  


const deleteCourse = async (courseId) => {
  await Axios.delete(`${API_URL}/${courseId}`, config).catch((error) => {
    throw new Error(error.response.data.error)});
};

// tested
const getAllCourses = async () => {
  try {
    const response = await Axios.get(`${API_URL}/all`, config);
    return response.data.courses.map(course => ({id: course._id, cName: course.courseName}));
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// tested
const updateCourse = async (courseId, newName) => {
  const bodyParameters = {
    courseName: newName,
  };
  await Axios.put(`${API_URL}/${courseId}`, bodyParameters, config).catch((error) => {
    throw new Error(error.response.data.error)});
};
  


const overviewService = {
    createCourse,
    deleteCourse,
    getAllCourses,
    updateCourse,
};

export default overviewService