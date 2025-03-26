const pool = require("../config/db");

class POSTUSERGOOGLE {
  static async POSTUSER(id, username, email, profile_picture) {
    const query = `
    insert  into "users" (id,username,email,profile_picture) values ($1,$2,$3,$4)
    `;
    const { rows } = await pool.query(query, [
      id,
      username,
      email,
      profile_picture,
    ]);
    return rows[0];
  }
  //
  //
  static async GETUSERNAMEANDPICTURE(user_id) {
    console.log("GET THE DETAILS OF IN MODEL", user_id);
    const query = `select * from "users"  where id =$1`;
    const { rows } = await pool.query(query, [user_id]);
    console.log(rows[0]);
    return rows[0];
  }
}

//
//

module.exports = POSTUSERGOOGLE;
