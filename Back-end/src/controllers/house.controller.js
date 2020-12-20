const HouseModel = require('../models/house.model');
const helpers = require('../helpers');

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

// api: Lấy thông nhà
const getHouse = async (req, res, next) => {
  try {
    const { id } = req.query;
    const house = await HouseModel.findById(id);
    if (house) {
      const { address } = house;
      let result = house;
      result.address = await helpers.convertAddress(address);
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(400).json({ message: 'Lỗi' });
  }
};

module.exports = {
  getHouse,
  getHouseList,
};
