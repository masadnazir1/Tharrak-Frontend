const pool = require("../config/db");

class commentsModel {
  static async PostComment(user_id, post_id, comment_text) {
    const query = `insert into tharrak_comments (user_id,post_id,comment_text,created_at) values ($1,$2,$3,now())  RETURNING *;`;

    const { rows } = await pool.query(query, [user_id, post_id, comment_text]);
    return rows;
  }
  //
  //
  //get comment by post
  static async GetComments(post_id) {
    console.log("ID ON MODEL", post_id);
    const query = `select * from tharrak_comments where tharrak_comments.post_id =$1`;

    const { rows } = await pool.query(query, [post_id]);
    console.log("RES IN MODEL", rows);
    return rows;
  }
  //
  //delete a comment by its id
  //
  static async DeleteComment(id) {
    console.log("ID ON MODEL", id);
    const query = `delete  from tharrak_comments where tharrak_comments.id =$1`;

    const { rows } = await pool.query(query, [id]);
    console.log("RES IN MODEL", rows);
    return rows;
  }
}

module.exports = commentsModel;
