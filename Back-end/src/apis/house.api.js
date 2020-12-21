const houseApi = require('express').Router();
const houseController = require('../controllers/house.controller');

houseApi.get('/list', houseController.getHouseList);

houseApi.get('/', houseController.getHouse);

houseApi.get('/filter', houseController.filterHouse);

module.exports = houseApi;
