const Video = require("../models/videoModel");

const getAllVideos = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { videoID: { $regex: search, $options: "i" } },
          { titleImageThumbnail: { $regex: search, $options: "i" } },
        ],
      };
    }

    const videos = await Video.find(query);
    res.status(200).json(videos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching videos", error: error.message });
  }
};

const getVideoById = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findOne({ videoID: videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching video", error: error.message });
  }
};

module.exports = {
  getAllVideos,
  getVideoById,
};
