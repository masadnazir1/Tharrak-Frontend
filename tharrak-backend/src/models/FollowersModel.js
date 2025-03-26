const pool = require("../config/db");

class FollowersModel {
  // 1️⃣ Follow a user
  static async followUser(follower_id, following_id) {
    try {
      const query = `
        INSERT INTO tharrak_followers (follower_id, following_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING 
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [follower_id, following_id]);
      return rows[0]; // Returns follow relationship
    } catch (error) {
      console.error("Error following user:", error);
      throw error;
    }
  }

  // 2️⃣ Unfollow a user
  static async unfollowUser(follower_id, following_id) {
    try {
      const query = `
        DELETE FROM tharrak_followers 
        WHERE follower_id = $1 AND following_id = $2
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [follower_id, following_id]);
      return rows[0]; // Returns unfollowed relationship
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  }

  // 3️⃣ Check if a user is following another user
  static async isFollowing(follower_id, following_id) {
    try {
      const query = `
        SELECT * FROM tharrak_followers 
        WHERE follower_id = $1 AND following_id = $2;
      `;
      const { rows } = await pool.query(query, [follower_id, following_id]);
      return rows.length > 0; // Returns true if following
    } catch (error) {
      console.error("Error checking follow status:", error);
      throw error;
    }
  }

  // 4️⃣ Get list of followers for a user
  static async getFollowers(user_id) {
    try {
      const query = `
        SELECT users.id, users.username, users.profile_picture 
        FROM tharrak_followers 
        JOIN users ON tharrak_followers.follower_id = users.id 
        WHERE tharrak_followers.following_id = $1;
      `;
      const { rows } = await pool.query(query, [user_id]);
      return rows;
    } catch (error) {
      console.error("Error getting followers:", error);
      throw error;
    }
  }

  // 5️⃣ Get list of users a user is following
  static async getFollowing(user_id) {
    try {
      const query = `
        SELECT users.id, users.username, users.profile_picture 
        FROM tharrak_followers 
        JOIN users ON tharrak_followers.following_id = users.id 
        WHERE tharrak_followers.follower_id = $1;
      `;
      const { rows } = await pool.query(query, [user_id]);
      return rows;
    } catch (error) {
      console.error("Error getting following list:", error);
      throw error;
    }
  }
}

module.exports = FollowersModel;
