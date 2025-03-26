import axios from "axios";

import EXPORTAPIURL from "../utils/EXPORTAPIURL";

const commentsService = {
  getComments: async (post_id) => {
    console.log(typeof post_id);
    try {
      const response = await axios.post(
        `${EXPORTAPIURL.COMMENTS.GET}`,
        { post_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; // Return uploaded post details
    } catch (error) {
      console.error(
        "Get comments Error:",
        error.response?.data || error.message
      );
      throw error.response?.data || { message: "Get comments failed" };
    }
  },

  postComment: async (user_id, post_id, comment_text) => {
    console.log("data for api ,", user_id, post_id, comment_text);
    try {
      const response = await axios.post(
        `${EXPORTAPIURL.COMMENTS.POST}`,
        {
          user_id,
          post_id,
          comment_text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; // Return the data
    } catch (error) {
      console.error("Post comments Error:", error);
    }
  },
};

export default commentsService;
