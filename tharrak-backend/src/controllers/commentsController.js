const commentsModel = require("../models/commentsModel");

const PostComment = async (req, res) => {
  try {
    const { user_id, post_id, comment_text } = req.body;
    if (!user_id || !post_id || !comment_text) {
      return res
        .status(400)
        .json({ error: "bad request please add all api body" });
    }

    const response = await commentsModel.PostComment(
      user_id,
      post_id,
      comment_text
    );
    res.status(200).json((comment = response));
  } catch (err) {
    return res.status(500).json({ Error: "Enternal server error" });
  }
};
//
//
//get comments fun
const GetComments = async (req, res) => {
  try {
    const { post_id } = req.body;
    console.log("ID", post_id);
    if (!post_id) {
      return res
        .status(400)
        .json({ error: "bad request please add post_id in body" });
    }

    const response = await commentsModel.GetComments(post_id);
    res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ Error: "Enternal server error" });
  }
};
//
//del a comment
//
const DeleteComment = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("ID", id);
    if (!id) {
      return res
        .status(400)
        .json({ error: "bad request please add post_id in body" });
    }

    const response = await commentsModel.DeleteComment(id);
    res.status(200).json({ Sucess: "Deleted the comment sucessfully" });
  } catch (err) {
    return res.status(500).json({ Error: "Enternal server error" });
  }
};

module.exports = { PostComment, GetComments, DeleteComment };
