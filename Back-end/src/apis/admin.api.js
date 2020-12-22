const adminApi = require('express').Router();
const adminController = require('../controllers/admin.controller');

adminApi.post('/login', adminController.postLogin);

module.exports = adminApi;
