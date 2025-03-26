const pool = require("../config/db");

class TharrakModel {
  static async addTharrak(user_id, post_id) {
    console.log("ADDING THE THARRAK", user_id, post_id);
    const query = `
      INSERT INTO tharraks (user_id, post_id) 
      VALUES ($1,$2 ) RETURNING *;
    `;
    const { rows } = await pool.query(query, [user_id, post_id]);

    return rows[0];
  }

  static async checkAlready(user_id, post_id) {
    console.log("CHECKING THE THARRAK", user_id, post_id);
    const query = `select count(*) FROM tharraks WHERE user_id= $1 AND post_id=$2 `;
    const { rows } = await pool.query(query, [user_id, post_id]);
    return rows[0];
  }

  static async getTharrakCount(post_id) {
    const query = `SELECT COUNT(*) FROM tharraks WHERE post_id =$1 `;
    const { rows } = await pool.query(query, [post_id]);
    return rows[0].count;
  }

  static async incrementTharrakCount(post_id) {
    try {
      const query = `
        UPDATE tharrak_posts 
        SET tharrak_count = tharrak_count + 1 
        WHERE id = $1 
        RETURNING tharrak_count;
      `;
      const { rows } = await pool.query(query, [post_id]);
      return rows[0]; // Returns updated tharrak_count
    } catch (error) {
      console.error("Error updating Tharrak count:", error);
      throw error;
    }
  }
}

module.exports = TharrakModel;
