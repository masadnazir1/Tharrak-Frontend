import axios from "axios";

import EXPORTAPIURL from "../utils/EXPORTAPIURL";

const RegisterService = {
  Register: async (username, email, password) => {
    try {
      const response = await axios.post(
        `${EXPORTAPIURL.AUTH.REGISTER}`,
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Return the response data (token, user info, etc.)
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      throw error.response?.data || { message: "Login failed" };
    }
  },
};

export default RegisterService;
