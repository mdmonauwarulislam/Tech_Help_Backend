const express = require('express');
const Router = express.Router();
const {getStudentDetails, updateStudentProfile} = require('../controllers/studentController');
const { verifyToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddle');
const {createDomainOfIntrest, getDomainOfIntrest} = require('../controllers/domainOfIntrestController');
const {addDegree, getDegree} = require('../controllers/degreeController');
const { addCollegeEducation, addSchoolEducation, getSchoolEducation, getCollegeEducation, getEducationList } = require('../controllers/addEducationController');
const { addProject, getProjects, updateProject, deleteProject } = require('../controllers/projectController');
const { createResponsibility, getAllResponsibilities, updateResponsibility, deleteResponsibility  } = require('../controllers/responsibilityController');

Router.get('/getstudentdetails',verifyToken, getStudentDetails);
Router.put('/upadatestudentdetails',verifyToken,upload.single("profileImage"), updateStudentProfile);

//upload the profile image
Router.post("/upload-profile", upload.single("profileImage"));

// Domain of intrest
Router.post('/create-domain-of-intrest', createDomainOfIntrest);
Router.get('/get-domain-of-intrest', getDomainOfIntrest);

// Routes of the degree
Router.post('/create-degree', addDegree);
Router.get('/get-degree', getDegree);

// Routes of the Education
Router.post('/addCollegeEducation',verifyToken,addCollegeEducation);
Router.post('/addSchoolEducation',verifyToken, addSchoolEducation);

Router.get('/getCollegeEducation',verifyToken, getCollegeEducation);
Router.get('/getSchoolEducation',verifyToken, getSchoolEducation);
Router.get('/getEducationList',verifyToken, getEducationList);

// Routes of the Projects
Router.post('/addProject',verifyToken, addProject);
Router.get('/getProjects',verifyToken, getProjects);
Router.put('/updateProject/:id',verifyToken, updateProject);
Router.delete('/deleteProject/:id',verifyToken, deleteProject);

// Routes of the responsibilities
Router.post('/addResponsibility',verifyToken, createResponsibility);
Router.get('/getResponsibilty',verifyToken, getAllResponsibilities);
Router.put('/updateResponsibility/:id', verifyToken, updateResponsibility);
Router.delete('/deleteResponsibilty/:id', verifyToken, deleteResponsibility);

module.exports = Router;