import axios from "axios";

const CloudinaryUpload = async (file) => {

  const cloudName = process.env.REACT_APP_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("cloud_name", cloudName);

  try {

    const result = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    return result.data.secure_url;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error.message;
      throw new Error(errorMessage);
    } else {
      throw new Error("Something went wrong, try again later");
    }
  }
};

export default CloudinaryUpload;
