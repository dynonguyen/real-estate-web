const CommentModel = require('../models/comment.model');

// api: Lấy danh sách comment của 1 sản phẩm
const getCommentList = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = await CommentModel.find({ houseId: id }).select(
      '-houseId -_id',
    );
    if (data) return res.status(200).json(data);
  } catch (error) {
    return res.status(409).json({ message: error });
  }
};

// api: Thêm 1 comment
const postComment = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await CommentModel.create(data);
    if (response) return res.status(200).send('success');
  } catch (error) {
    return res.status(400).send('success');
  }
};

module.exports = {
  getCommentList,
  postComment,
};
