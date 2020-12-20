const BrokerModel = require('../models/accounts/borker.model');
const UserModel = require('../models/accounts/user.model');

//get user
const getUser = async (req, res, next) => {
  try {
    //if check authentication wrong then return error
    if (!res.locals.isAuth)
      return res
        .status(400)
        .json({ message: 'Không thể lấy thông tin user', error });
    //else get information user -> send client
    const { _id } = req.user;
    const infoUser = await UserModel.findOne({ accountId: _id });
    //send information user except _id
    const infoUserSend = { ...infoUser._doc, accountId: null, _id: null };
    res.status(200).json({ user: infoUserSend });
  } catch (error) {
    res.status(400).json({ message: 'Không thể lấy thông tin user', error });
  }
};

const getBrokerList = async (req, res, next) => {
  try {
    const data = await BrokerModel.find({});
    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(400).json({ message: 'failed' });
  }
};

//export
module.exports = {
  getUser,
  getBrokerList,
};
