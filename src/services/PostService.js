import axios from "axios";

import EXPORTAPIURL from "../utils/EXPORTAPIURL";

const PostService = {
  uploadPost: async (user_id, caption, image) => {
    try {
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("caption", caption);
      formData.append("image", image);

      const response = await axios.post(
        `${EXPORTAPIURL.POSTS.CREATE}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // Return uploaded post details
    } catch (error) {
      console.error(
        "Upload Post Error:",
        error.response?.data || error.message
      );
      throw error.response?.data || { message: "Post upload failed" };
    }
  },
  // Get All Posts
  getAllPosts: async () => {
    try {
      const response = await axios.get(`${EXPORTAPIURL.POSTS.GET_ALL}`);
      return response.data; // Array of posts
    } catch (error) {
      console.error(
        "Get All Posts Error:",
        error.response?.data || error.message
      );
      throw error.response?.data || { message: "Failed to fetch posts" };
    }
  },
  getTrending: async (count) => {
    try {
      const response = await axios.post(
        `${EXPORTAPIURL.POSTS.TRENDING}`,

        { count },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Array of posts
    } catch (error) {
      console.error(
        "Get Trending Posts Error:",
        error.response?.data || error.message
      );
      throw error.response?.data || { message: "Failed to fetch posts" };
    }
  },
  //Trending
};

export default PostService;
