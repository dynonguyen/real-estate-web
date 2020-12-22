const AdminModel = require('../models/accounts/admin.model');

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

module.exports = {
  postLogin,
};
