import axios from "axios";

import EXPORTAPIURL from "../utils/EXPORTAPIURL";

const USER_SERVICE = {
  GETUSER: async (user_id) => {
    try {
      const response = await axios.post(
        `${EXPORTAPIURL.USER.GET_DETALS}`,
        { user_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Return the response data (token, user info, etc.)
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      throw (
        error.response?.data || {
          message: "Failed to get the User details",
        }
      );
    }
  },
};

export default USER_SERVICE;
