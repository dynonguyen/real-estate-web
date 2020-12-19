const addressApi = require('express').Router();
const addressController = require('../controllers/address.controller');

// api: lấy danh sách các tỉnh thành phố
addressApi.get('/province', addressController.getProvince);

// api: lấy danh sách huyện/quận theo id tỉnh
addressApi.get('/district', addressController.getDistrict);

module.exports = addressApi;
