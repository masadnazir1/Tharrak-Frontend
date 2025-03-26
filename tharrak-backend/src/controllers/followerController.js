const FollowersModel = require("../models/FollowersModel");

// Follow a user
const followUser = async (req, res) => {
  try {
    const { follower_id, following_id } = req.body;

    if (!follower_id || !following_id) {
      return res
        .status(400)
        .json({ error: "Both follower_id and following_id are required" });
    }

    const follow = await FollowersModel.followUser(follower_id, following_id);

    if (!follow) {
      return res.status(400).json({ message: "Already following this user" });
    }

    res.status(201).json({ message: "Followed successfully", follow });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  try {
    const follower_id = req.headers["follower-id"];
    const following_id = req.headers["following-id"];
    console.log(follower_id, following_id);

    if (!follower_id || !following_id) {
      return res
        .status(400)
        .json({ error: "Both follower_id and following_id are required" });
    }

    const unfollow = await FollowersModel.unfollowUser(
      follower_id,
      following_id
    );
    if (!unfollow) {
      return res.status(400).json({ message: "Not following this user" });
    }

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check if a user is following another user
const checkFollowStatus = async (req, res) => {
  try {
    const { follower_id, following_id } = req.body;

    if (!follower_id || !following_id) {
      return res
        .status(400)
        .json({ error: "Both follower_id and following_id are required" });
    }

    const isFollowing = await FollowersModel.isFollowing(
      follower_id,
      following_id
    );
    res.status(200).json({ isFollowing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get list of followers for a user
const getFollowers = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const followers = await FollowersModel.getFollowers(user_id);
    res.status(200).json({ followers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get list of users a user is following
const getFollowing = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const following = await FollowersModel.getFollowing(user_id);
    res.status(200).json({ following });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  checkFollowStatus,
  getFollowers,
  getFollowing,
};
