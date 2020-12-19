const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post Collection: Lưu thông tin bài đăng nhà
const postSchema = new Schema({
  // Mã bài đăng
  code: { type: String, unique: true, trim: true, required: true },

  // người đăng
  host: { type: Schema.Types.ObjectId, required: true },

  // nhà được đăng
  houseId: { type: Schema.Types.ObjectId, required: true },

  // ngày đăng
  start: { type: Date, required: true, default: Date.now() },

  // ngày kết thúc
  end: { type: Date, required: true, default: Date.now() },

  // những bức ảnh khác của nhà
  catalogs: { type: [String], default: [] },

  // nội dung chi tiết bài đăng
  content: { type: String, default: '' },
});

const PostModel = mongoose.model('post', postSchema, 'posts');

module.exports = PostModel;
