const PostModel = require('../models/post.model');

const getPost = async (req, res, next) => {
  try {
    const { id } = req.query;
    const post = await PostModel.findOne({ houseId: id });
    if (post) {
      return res.status(200).json(post);
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = {
  getPost,
};
