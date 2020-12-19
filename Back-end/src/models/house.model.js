const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// House Collection: Lưu thông tin nhà được đăng
const houseSchema = new Schema({
  // chủ nhà là FK của user
  host: { type: Schema.Types.ObjectId, required: true },

  // ảnh đại diện của nhà
  avt: { type: String, default: '' },

  // tiêu đề của nhà
  title: { type: String, required: true, trim: true, maxlength: 1000 },

  // loại nhà (true-thuê, false-bán)
  isHire: { type: Boolean, required: true, default: true },

  // loại bất động sản (Chuyển đổi xem trong thư mục helpers)
  type: { type: Number, enum: [...Array(11).keys()], default: 0 },

  // giá (nếu nhà bán: tính theo tỉ (triệu), thuê (triệu/tháng))
  price: { type: Number, required: true, default: 0 },

  // diện tích nhà (m^2)
  square: { type: Number, required: true, default: 0 },

  // địa chỉ (mảng các id tỉnh thành cụ thể)
  address: {
    type: Object,
    required: true,
    province: String,
    district: String,
    wards: String,
    street: String,
    details: { type: String, default: '' },
  },
});

const HouseModel = mongoose.model('house', houseSchema, 'house');

module.exports = HouseModel;
