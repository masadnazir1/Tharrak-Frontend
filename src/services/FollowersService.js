import axios from "axios";
import EXPORTAPIURL from "../utils/EXPORTAPIURL";

const FollowersService = {
  followUser: async (follower_id, following_id) => {
    console.log(follower_id, following_id);
    try {
      const response = await axios.post(
        `${EXPORTAPIURL.FOLLOW.FOLLOW}`,
        {
          follower_id,
          following_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Follow User Error:",
        error.response?.data || error.message
      );
      throw error.response?.data || { message: "Follow action failed" };
    }
  },

  unfollowUser: async (follower_id, following_id) => {
    try {
      console.log(follower_id, following_id);
      const response = await axios.delete(`${EXPORTAPIURL.FOLLOW.UNFOLLOW}`, {
        headers: {
          "Content-Type": "application/json",
          "follower-id": follower_id,
          "following-id": following_id,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Unfollow User Error:",
        error.response?.data || error.message
      );
      throw error.response?.data || { message: "Unfollow action failed" };
    }
  },

  checkFollowStatus: async (follower_id, following_id) => {
    try {
      const response = await axios.post(
        `${EXPORTAPIURL.FOLLOWERS.CHECK_STATUS}`,
        {
          follower_id,
          following_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Check Follow Status Error:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data || { message: "Failed to check follow status" }
      );
    }
  },

  getFollowers: async (user_id) => {
    try {
      const response = await axios.post(
        `${EXPORTAPIURL.FOLLOW.GEALL}`,
        {
          user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Get Followers Error:",
        error.response?.data || error.message
      );
      throw error.response?.data || { message: "Failed to get followers" };
    }
  },

  getFollowing: async (user_id) => {
    try {
      const response = await axios.post(
        `${EXPORTAPIURL.FOLLOWERS.GET_FOLLOWING}`,
        {
          user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Get Following Error:",
        error.response?.data || error.message
      );
      throw error.response?.data || { message: "Failed to get following list" };
    }
  },
};

export default FollowersService;
