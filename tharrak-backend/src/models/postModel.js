const pool = require("../config/db");

class PostModel {
  static async createPost(user_id, imagePath, caption) {
    const query = `
      INSERT INTO tharrak_posts (user_id, image_url, caption) 
      VALUES ($1,$2 ,$3 ) RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, imagePath, caption]);
    return rows[0];
  }

  static async getPosts() {
    const query = `SELECT 
    tp.id,
    tp.user_id,
    tp.image_url,
    tp.caption,
    tp.tharrak_count,
    tp.created_at,
    u.username,
    u.email,
    u.profile_picture
    FROM tharrak_posts tp
    LEFT JOIN users u ON tp.user_id = u.id
    ORDER BY tp.created_at DESC;
`;
    const { rows } = await pool.query(query);
    return rows;
  }

  //
  static async getTrendingPosts(count) {
    const query = `SELECT * FROM tharrak_posts where tharrak_count=$1  ORDER BY created_at DESC`;
    const { rows } = await pool.query(query, [count]);
    return rows;
  }
}

module.exports = PostModel;
