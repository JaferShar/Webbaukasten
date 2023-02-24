import Axios from "axios";
import { toast } from "react-toastify";

const API_URL = "/api/account/";

/**
 * This module registers a new account using the provided account data.
 *
 * @param {*} accountData the account information to be registered.
 * @returns a promise that resolves to the response data from the API.
 */
const register = async (accountData) => {
  try {
    const response = await Axios.post(API_URL, accountData);

    if (response.data) {
      localStorage.setItem("account", JSON.stringify(response.data));
    }

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

// Logout a user
const logout = () => {
  localStorage.removeItem("account");
};

const authService = {
  register,
  logout,
};

export default authService;
