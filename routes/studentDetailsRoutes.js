const express = require('express');
const Router = express.Router();
const {getStudentDetails, updateStudentProfile} = require('../controllers/studentController');
const { verifyToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddle');
const {createDomainOfIntrest, getDomainOfIntrest} = require('../controllers/domainOfIntrestController');

Router.get('/getstudentdetails',verifyToken, getStudentDetails);
Router.put('/upadatestudentdetails',verifyToken,upload.single("profileImage"), updateStudentProfile);

//upload the profile image
Router.post("/upload-profile", upload.single("profileImage"));

// Domain of intrest
Router.post('/create-domain-of-intrest', createDomainOfIntrest);
Router.get('/get-domain-of-intrest', getDomainOfIntrest);

module.exports = Router;