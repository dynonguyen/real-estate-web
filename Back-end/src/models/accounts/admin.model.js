const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  userName: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  name: { type: String, trim: true, required: true },
});

const AdminModel = mongoose.model('admin', adminSchema, 'admins');

module.exports = AdminModel;
