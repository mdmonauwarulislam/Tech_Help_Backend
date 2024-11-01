const express = require('express');
const Router = express.Router();

const {createBlog} = require('../controllers/blogController');
const { verifyToken } = require('../middleware/authMiddleware');

Router.post('/createblog', verifyToken, createBlog);

module.exports = Router;