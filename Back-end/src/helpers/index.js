const VerifyModel = require('../models/accounts/verify.model');
const constants = require('../constants/index');
const AddressModel = require('../models/address.model');

// fn: tạo mã xác thực
const generateVerifyCode = (numberOfDigits) => {
  //random một số từ 1 -> 10^numberOfDigits
  const n = parseInt(numberOfDigits);
  const number = Math.floor(Math.random() * Math.pow(10, n)) + 1;
  let numberStr = number.toString();
  const l = numberStr.length;
  for (let i = 0; i < 6 - l; ++i) {
    numberStr = '0' + numberStr;
  }
  return numberStr;
};

// fn: kiểm tra mã xác thực
const isVerifyEmail = async (email, verifyCode) => {
  try {
    const res = await VerifyModel.findOne({ email });
    if (res) {
      const { code, dateCreated } = res;
      if (code !== verifyCode) return false;
      const now = Date.now();
      // kiểm tra mã còn hiệu lực hay không
      if (now - dateCreated > constants.VERIFY_CODE_TIME_MILLISECONDS)
        return false;
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// fn: chuyển address id thành address string
const convertAddress = async (address) => {
  try {
    let result = '';
    const { province, district, wards, street, details } = address;
    const data = await AddressModel.findOne({ id: province.toString() });
    if (data) {
      const { districts } = data;
      const proName = data.name;

      const dis = districts.find((item) => {
        return item.id == district.toString();
      });

      if (dis) {
        const disName = dis ? dis.name : '';

        const ward = dis.wards.find((item) => item.id == wards.toString());
        const wName = ward.prefix + ' ' + ward.name;

        const s = dis.streets
          ? dis.streets.find((item) => item.id == street.toString())
          : null;
        const sName = s ? s.prefix + ' ' + s.name : '';
        result =
          details +
          ', ' +
          sName +
          ', ' +
          wName +
          ', ' +
          disName +
          ', ' +
          proName;
      } else {
        return proName;
      }
    }
    return result;
  } catch (error) {
    return '';
  }
};

// fn: Chuyển loại diện tích thành query diện tích
const convertSquareQuery = (type) => {
  type = parseInt(type);
  switch (type) {
    case 1:
      return { square: { $lt: 30 } };
    case 2:
      return { square: { $gte: 30, $lt: 50 } };
    case 3:
      return { square: { $gte: 50, $lt: 80 } };
    case 4:
      return { square: { $gte: 80, $lt: 200 } };
    case 5:
      return { square: { $gte: 200, $lt: 350 } };
    case 6:
      return { square: { $gte: 350, $lt: 500 } };
    case 7:
      return { square: { $gte: 500, $lt: 1000 } };
    case 8:
      return { square: { $gte: 1000 } };
    default:
      return {};
  }
};

// fn: Chuyển loại giá thành giá
const convertPriceQuery = (type) => {
  type = parseInt(type);
  switch (type) {
    case 0:
      return { price: 0 };
    case 1:
      return { price: { $lt: 500 } };
    case 2:
      return { price: { $gte: 500, $lt: 800 } };
    case 3:
      return { price: { $gte: 800, $lt: 1000 } };
    case 4:
      return { price: { $gte: 1000, $lt: 2000 } };
    case 5:
      return { price: { $gte: 2000, $lt: 3000 } };
    case 6:
      return { price: { $gte: 3000, $lt: 4000 } };
    case 7:
      return { price: { $gte: 5000, $lt: 5000 } };
    case 8:
      return { price: { $gte: 5000, $lt: 7000 } };
    case 9:
      return { price: { $gte: 7000, $lt: 10000 } };
    case 10:
      return { price: { $gte: 10000, $lt: 20000 } };
    case 11:
      return { price: { $gte: 20000 } };
    default:
      return {};
  }
};

module.exports = {
  generateVerifyCode,
  isVerifyEmail,
  convertAddress,
  convertSquareQuery,
  convertPriceQuery,
};
