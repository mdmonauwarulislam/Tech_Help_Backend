const express = require("express");
const Router = express.Router();
const {
  getStudentDetails,
  updateStudentProfile,
} = require("../controllers/studentController");

const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddle");
const {
  createDomainOfIntrest,
  getDomainOfIntrest,
} = require("../controllers/domainOfIntrestController");
const { addDegree, getDegree } = require("../controllers/degreeController");
const {
  addCollegeEducation,
  addSchoolEducation,
  getSchoolEducation,
  getCollegeEducation,
  getEducationList,
} = require("../controllers/addEducationController");
const {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const {
  createResponsibility,
  getAllResponsibilities,
  updateResponsibility,
  deleteResponsibility,
} = require("../controllers/responsibilityController");
const {
  addWorkExperience,
  getAllWorkExperiences,
  updateWorkExperience,
  deleteWorkExperience,
  getSingleWorkExperience
} = require("../controllers/experienceController");

const {
  addCertification,
  getAllCertifications,
  updateCertification,
  deleteCertification,
} = require("../controllers/certificationController");

const {
  addAchievement,
  updateAchievement,
  getAchievements,
  deleteAchievement,
  getSingleAchievement,
} = require("../controllers/achievementController");

Router.get("/getstudentdetails", verifyToken, getStudentDetails);
Router.put(
  "/upadatestudentdetails",
  verifyToken,
  upload.single("profileImage"),
  updateStudentProfile
);

//upload the profile image
Router.post("/upload-profile", upload.single("profileImage"));

// Domain of intrest
Router.post("/create-domain-of-intrest", createDomainOfIntrest);
Router.get("/get-domain-of-intrest", getDomainOfIntrest);

// Routes of the degree
Router.post("/create-degree", addDegree);
Router.get("/get-degree", getDegree);

// Routes of the Education
Router.post("/addCollegeEducation", verifyToken, addCollegeEducation);
Router.post("/addSchoolEducation", verifyToken, addSchoolEducation);

Router.get("/getCollegeEducation", verifyToken, getCollegeEducation);
Router.get("/getSchoolEducation", verifyToken, getSchoolEducation);
Router.get("/getEducationList", verifyToken, getEducationList);

// Routes of the Projects
Router.post("/addProject", verifyToken, addProject);
Router.get("/getProjects", verifyToken, getProjects);
Router.put("/updateProject/:id", verifyToken, updateProject);
Router.delete("/deleteProject/:id", verifyToken, deleteProject);

// Routes of the responsibilities
Router.post("/addResponsibility", verifyToken, createResponsibility);
Router.get("/getResponsibilty", verifyToken, getAllResponsibilities);
Router.put("/updateResponsibility/:id", verifyToken, updateResponsibility);
Router.delete("/deleteResponsibilty/:id", verifyToken, deleteResponsibility);

// Routes of the work experience
Router.post("/addWorkExperience", verifyToken, addWorkExperience);
Router.get("/getWorkExperiences", verifyToken, getAllWorkExperiences);
Router.put("/updateWorkExperience/:id", verifyToken, updateWorkExperience);
Router.delete("/deleteWorkExperience/:id", verifyToken, deleteWorkExperience);
Router.get("/getSingleWorkExperience/:id", verifyToken, getSingleWorkExperience);

// Routes of the achievements
Router.post("/addAchievement", verifyToken, addAchievement);
Router.get("/getAchievements", verifyToken, getAchievements);
Router.put("/updateAchievement/:id", verifyToken, updateAchievement);
Router.delete("/deleteAchievement/:id", verifyToken, deleteAchievement);

// Routes of the certification
Router.post("/addCertification", verifyToken, addCertification);
Router.get("/getAllCertifications", verifyToken, getAllCertifications);
Router.put("/updateCertification/:id", verifyToken, updateCertification);
Router.delete("/deleteCertification/:id", verifyToken, deleteCertification);

module.exports = Router;
