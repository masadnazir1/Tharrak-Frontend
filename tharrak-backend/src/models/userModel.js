const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

class UserModel {
  static async createUser(username, email, password) {
    try {
      console.log(username, email, password);

      const id = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
        INSERT INTO users (id, username, email, password) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, username, email;
      `;

      const values = [id, username, email, hashedPassword];
      const { rows } = await pool.query(query, values);

      return rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const query = `SELECT * FROM users WHERE email = $1`;
      const { rows } = await pool.query(query, [email]);
      return rows[0];
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  }

  static async loginUser(email, password) {
    try {
      // Fetch user by email
      const user = await this.getUserByEmail(email);
      if (!user) {
        return { error: "Invalid email or password" };
      }

      // Compare hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { error: "Invalid email or password" };
      }

      // Remove password from returned object for security
      delete user.password;

      return user;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }
}

module.exports = UserModel;
