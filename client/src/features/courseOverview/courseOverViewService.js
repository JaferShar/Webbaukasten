import axios from "axios";

const API_URL = "api/course";

const createCourse = async (courseData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(API_URL, courseData, config);
  return response.data;
};

const getAllCourses = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(API_URL + "/all", config);
  return response.data;
};

const deleteCourse = async (courseId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(API_URL + `/${courseId}`, config);
  return response.data;
};

const renameCourse = async (courseData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    API_URL + `/${courseData.courseId}`,
    courseData,
    config
  );
  return response.data;
};

const shareCourse = async (data, token) => {
  try {
    console.log(data);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(data)
    console.log(API_URL + `/share/${data.courseId}`)
    const response = await axios.post(
      API_URL + `/share/${data.courseId}`,
      data.email,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
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
