const PostModel = require("../models/postModel");
const path = require("path");
const multer = require("multer");
//
// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  //
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
  },
});
//
//
// Multer upload instance
const upload = multer({ storage });
//
const createPost = async (req, res) => {
  try {
    const { user_id, caption } = req.body;
    //check the file
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }
    const imagePath = `/uploads/${req.file.filename}`; // Store relative path in DB
    const fullImageUrl = `${req.protocol}://${req.get("host")}${imagePath}`;
    //
    const post = await PostModel.createPost(user_id, fullImageUrl, caption);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.getPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPost, upload, getPosts };
