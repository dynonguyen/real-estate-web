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
          return { ...item._doc, address: newAddress };
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
      console.log(address);
      let result = house;
      result.address = await helpers.convertAddress(address);
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(400).json({ message: 'Lỗi' });
  }
};

const filterHouse = async (req, res, next) => {
  try {
    const { page, perPage, ...conditions } = req.query;

    let query = {};
    //  loại nhà thuê hay bán
    if (conditions.isHire == 'true') query.isHire = true;
    else query.isHire = false;

    // loại nhà
    if (conditions.hasOwnProperty('type')) {
      query.type = parseInt(conditions.type);
    }

    // diện tích
    if (conditions.hasOwnProperty('square')) {
      const square = helpers.convertSquareQuery(conditions.square);
      Object.assign(query, square);
    }

    // giá
    if (conditions.hasOwnProperty('price')) {
      const price = helpers.convertPriceQuery(conditions.price);
      Object.assign(query, price);
    }

    // tỉnh thành
    if (conditions.hasOwnProperty('province')) {
      const province = {};
      province['address.province'] = parseInt(conditions.province);
      Object.assign(query, province);
    }

    // huyện, quận
    if (conditions.hasOwnProperty('district')) {
      const district = {};
      district['address.district'] = parseInt(conditions.district);
      Object.assign(query, district);
    }
    // return res.status(200).json(query);

    // query and paginate
    const skip = (parseInt(page) - 1) * parseInt(perPage);
    const count = await HouseModel.countDocuments({ ...query });
    const data = await HouseModel.find({ ...query })
      .skip(skip)
      .limit(parseInt(perPage));

    // return
    if (data) {
      const result = await Promise.all(
        data.map(async (item) => {
          const newAddress = await helpers.convertAddress(item.address);
          return { ...item._doc, address: newAddress };
        }),
      );
      return res.status(200).json({ count, list: result });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'failed' });
  }
};

module.exports = {
  getHouse,
  getHouseList,
  filterHouse,
};
