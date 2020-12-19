const houseApi = require('express').Router();
const houseController = require('../controllers/house.controller');

houseApi.get('/list', houseController.getHouseList);

module.exports = houseApi;
