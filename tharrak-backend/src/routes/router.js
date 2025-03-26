const express = require("express");
const router = express.Router();

const { registerUser, LoginTheUser } = require("../controllers/userController");
const {
  createPost,
  getPosts,

  upload,
} = require("../controllers/postController");
const { getTrending } = require("../controllers/trendingController");
const { addTharrak, getTharrak } = require("../controllers/tharrakController");
const {
  followUser,
  unfollowUser,
  checkFollowStatus,
  getFollowers,
  getFollowing,
} = require("../controllers/followerController");
const {
  PostComment,
  GetComments,
  DeleteComment,
} = require("../controllers/commentsController");
//
const {
  GoogleAuth,
  GetDetails,
} = require("../controllers/GoogleAuthController");
//
//
//
router.post("/users/register", registerUser);
router.post("/users/login", LoginTheUser);
router.post("/posts/create", upload.single("image"), createPost);
router.get("/posts/get", getPosts);
//like ie add tharrak
router.post("/add/tharrak", addTharrak);
router.get("/get/tharrak", getTharrak);
router.post("/Trending", getTrending);
//
router.post("/follow/add", followUser);
router.delete("/follow/del", unfollowUser);
router.get("/follow/check", checkFollowStatus);
router.post("/follow/getall", getFollowers);
router.get("/follow/getFollowing", getFollowing);
//
//post comments
router.post("/add/comment", PostComment);
router.get("/get/comments", GetComments);
router.delete("/del/comment", DeleteComment);
//
//
//Google Auth login
//
router.post("/Google/login", GoogleAuth);
router.post("/Google/details", GetDetails);

module.exports = router;
