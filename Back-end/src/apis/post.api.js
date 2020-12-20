const postApi = require('express').Router();
const postController = require('../controllers/post.controller');

postApi.get('/', postController.getPost);

module.exports = postApi;
