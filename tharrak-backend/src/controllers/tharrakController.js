const TharrakModel = require("../models/tharrakModel");

const addTharrak = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;
    const already = await TharrakModel.checkAlready(user_id, post_id);
    if (already.count != 1) {
      const tharrak = await TharrakModel.addTharrak(user_id, post_id);
      //add increment to the post count plus
      await TharrakModel.incrementTharrakCount(post_id);
      res.status(201).json(tharrak);
    } else {
      res.status(200).json({ already: "Already liked" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Get total tharraks
const getTharrak = async (req, res) => {
  try {
    const { post_id } = req.body;
    const tharrak = await TharrakModel.getTharrakCount(post_id);
    res.status(200).json(tharrak);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addTharrak, getTharrak };
