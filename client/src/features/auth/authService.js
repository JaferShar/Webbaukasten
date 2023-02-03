import Axios from "axios";

const API_URL = "/api/account/";

// Register a new account
const register = async (accountData) => {
    const response = await Axios.post(API_URL, accountData);
    
    if (response.data) {
      localStorage.setItem("account", JSON.stringify(response.data));
    }

    return response.data;
}

// Logout a user
const logout = () => {
    localStorage.removeItem("account");
}

const authService = {
    register,
    logout
  }

export default authService