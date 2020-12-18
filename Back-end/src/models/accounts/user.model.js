const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // id liên kết với account của user này
  accountId: { type: Schema.Types.ObjectId, required: true },
  fullName: { type: String, trim: true, required: true },
  birthday: { type: String, default: '1970-01-01' },
  // true: male
  gender: { type: Boolean, required: true, default: true },
  phone: { type: String, trim: true, default: '' },
  address: { type: String, trim: true, default: null },
  avt: { type: String, default: '' },
});

const UserModel = mongoose.model('user', userSchema, 'users');

module.exports = UserModel;
