const express = require('express');
const {Login, Register} = require('../controllers/userController');
const upload = require('../middleware/multerMiddle');
const Router = express.Router();


Router.post('/login', Login);
Router.post('/register', Register);
//upload the profile image
Router.post("/upload-profile", upload.single("profileImage"));

module.exports = Router;


