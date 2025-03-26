const PostModel = require("../models/postModel");

//

const getTrending = async (req, res) => {
  try {
    const { count } = req.body;

    if (count == null || isNaN(count) || count <= 0) {
      return res
        .status(400)
        .json({
          error: "Valid 'count' is required to get the trending posts!",
        });
    }

    const trendingPosts = await PostModel.getTrendingPosts(Number(count));
    return res.json(trendingPosts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getTrending };
