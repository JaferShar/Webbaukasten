import Axios from "axios";

const API_URL = "/api/account/";

// Register a new user
const register = async (user) => {
    const response = await Axios.post(API_URL + "register", user);
    return response.data;
}

const authService = {
    register,
  }

export default authService