const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await UserModel.createUser(username, email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const LoginTheUser = async (req, res) => {
  const SECRET_KEY = "jsdjsjhsddhfhffTharkisfhuiehfw"; // Use environment variables in production
  try {
    const { email, password } = req.body;
    const user = await UserModel.loginUser(email, password);
    //create the token and send to frontend
    const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "7Days" });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, LoginTheUser };
