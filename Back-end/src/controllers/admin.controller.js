const AdminModel = require('../models/accounts/admin.model');
const HouseModel = require('../models/house.model');
const helpers = require('../helpers');
const UserModel = require('../models/accounts/user.model');

const postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await AdminModel.findOne({ username, password });
    if (user) {
      return res.status(200).json({ name: user.name });
    }
    return res.status(400).send('failed');
  } catch (error) {
    return res.status(400).send('error');
  }
};

const getAllHouse = async (req, res, next) => {
  try {
    const { page, perPage } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(perPage);
    const count = await HouseModel.countDocuments({});
    const data = await HouseModel.find({}).skip(skip).limit(parseInt(perPage));
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
    return res.status(400).json({ message: 'failed' });
  }
};

const deleteHouse = async (req, res, next) => {
  try {
    const { _id } = req.query;
    const isDel = await HouseModel.deleteOne({ _id });
    console.log(isDel);
    if (isDel && isDel.deletedCount) {
      return res.status(200).send('success');
    }
  } catch (error) {
    return res.status(400).send('success');
  }
};

const updateHouse = async (req, res, next) => {
  try {
    const data = req.body;
    const { _id, ...rest } = data;
    const result = await HouseModel.updateOne({ _id }, { ...rest });
    if (result && result.nModified) {
      return res.status(200).send('success');
    }
  } catch (error) {
    return res.status(400).send('failed');
  }
};

const getAllCustomer = async (req, res, next) => {
  try {
    const { perPage, page } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(perPage);
    const count = await UserModel.countDocuments({});
    const userList = await UserModel.find({})
      .skip(skip)
      .limit(parseInt(perPage));
    if (userList) return res.status(200).json({ list: userList, count });
  } catch (error) {
    return res.status(400).json({ message: 'failed' });
  }
};

module.exports = {
  postLogin,
  getAllHouse,
  deleteHouse,
  updateHouse,
  getAllCustomer,
};
