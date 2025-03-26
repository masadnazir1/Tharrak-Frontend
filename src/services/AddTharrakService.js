import axios from "axios";

import EXPORTAPIURL from "../utils/EXPORTAPIURL";

const THARRAK = {
  addTharrak: async (user_id, post_id) => {
    try {
      const response = await axios.post(
        `${EXPORTAPIURL.THARRAK.ADD}`,
        { user_id, post_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Return the response data (token, user info, etc.)
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      throw error.response?.data || { message: "Tharrak addition failed" };
    }
  },

  GeTTharrak: async (post_id) => {
    try {
      const response = await axios.get(
        `${EXPORTAPIURL.THARRAK.GET}`,
        { post_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Return the response data (token, user info, etc.)
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      throw error.response?.data || { message: "Tharrak addition failed" };
    }
  },
};

export default THARRAK;
