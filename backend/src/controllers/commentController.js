const Comment = require("../models/commentModel");

const getAllComments = async (req, res) => {
  try {
    const { videoID } = req.query;
    let query = {};

    if (videoID) {
      query = { videoID: videoID };
    }

    const comments = await Comment.find(query);
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { username, comment, videoID } = req.body;
    const newComment = new Comment({
      username,
      comment,
      videoID,
    });

    const savedComment = await newComment.save();
    res.status(200).json({ success: true, comment: savedComment });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error submitting comment",
        error: error.message,
      });
  }
};

module.exports = {
  getAllComments,
  addComment,
};
