const adminApi = require('express').Router();
const adminController = require('../controllers/admin.controller');

adminApi.post('/login', adminController.postLogin);

adminApi.get('/list-house', adminController.getAllHouse);

adminApi.delete('/del-house', adminController.deleteHouse);

adminApi.put('/update-house', adminController.updateHouse);

adminApi.get('/list-customer', adminController.getAllCustomer);

adminApi.get('/list-account', adminController.getAccountList);

adminApi.post('/post', adminController.postAddHouse);

module.exports = adminApi;
