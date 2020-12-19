const HouseModel = require('../models/house.model');
const helpers = require('../helpers');

// fn: chuyển danh sách địa chỉ nhà
const convertHomeList = async (list) => {
  try {
    return null;
  } catch (error) {
    throw error;
  }
};

// api: Lấy danh sách nhà liên quan loại hoặc nhãn hiệu
const getHouseList = async (req, res, next) => {
  try {
    const { type, isHire, limit, id } = req.query;
    let query = {};
    if (type != -1) query = { type };
    if (isHire != -1)
      query = { $or: [{ ...query }, { isHire: isHire ? true : false }] };
    if (id !== '') query = { ...query, _id: { $ne: id } };
    const list = await HouseModel.find(query).limit(parseInt(limit));
    if (list) {
      const result = await Promise.all(
        list.map(async (item) => {
          const newAddress = await helpers.convertAddress(item.address);
          let house = item;
          house.address = newAddress;
          return house;
        }),
      );

      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(400).json({ message: 'Không thể lấy dữ liệu' });
  }
};

module.exports = {
  getHouseList,
};
