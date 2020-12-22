const AdminModel = require('../models/accounts/admin.model');
const HouseModel = require('../models/house.model');
const helpers = require('../helpers');
const UserModel = require('../models/accounts/user.model');
const AccountModel = require('../models/accounts/account.model');
const PostModel = require('../models/post.model');

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

const getAccountList = async (req, res, next) => {
  try {
    const list = await AccountModel.find({}).select('email _id');
    if (list) {
      return res.status(200).json(list);
    }
  } catch (error) {
    return res.status(400).json({ message: 'Error' });
  }
};

const postAddHouse = async (req, res, next) => {
  try {
    const { house, post } = req.body;
    const isExistPost = await PostModel.exists({ code: post.code });
    if (isExistPost)
      return res.status(409).json({ message: 'Mã bài đăng đã tồn tại' });
    const newHouse = await HouseModel.create({ ...house });
    if (newHouse) {
      const newPost = await PostModel.create({
        ...post,
        houseId: newHouse._id,
      });
      if (newPost) {
        return res.status(200).json({ message: 'success' });
      }
    }
  } catch (error) {
    return res.status(400).json({ message: 'Thêm bài đăng thất bại' });
  }
};

module.exports = {
  postLogin,
  getAllHouse,
  deleteHouse,
  updateHouse,
  getAllCustomer,
  getAccountList,
  postAddHouse,
};
