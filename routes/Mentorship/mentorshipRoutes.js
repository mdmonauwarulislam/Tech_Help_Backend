const express = require("express");
const {getMentorProfile, updateMentorProfile} = require("../../controllers/Mentorship/mentorController");
const{ verifyToken} = require("../../middleware/authMiddleware");
const { addCollegeEducation, addSchoolEducation, getCollegeEducation, getSchoolEducation, getEducationList, deleteEducation } = require("../../controllers/addEducationController");
const { addWorkExperience, getAllWorkExperiences, updateWorkExperience, deleteWorkExperience, getSingleWorkExperience } = require("../../controllers/experienceController");
const upload = require("../../middleware/multerMiddle");
const Router = express.Router();




// GET Mentor Profile
Router.get("/profile", verifyToken, getMentorProfile);

// UPDATE Mentor Profile
Router.put("/profile/update", verifyToken, upload.single("profileImage"), updateMentorProfile);

//upload the profile image
Router.post("/upload-profile", upload.single("profileImage"));
// Mentor Education Routes

Router.post("/addCollegeEducation", verifyToken, addCollegeEducation);
Router.post("/addSchoolEducation", verifyToken, addSchoolEducation);

Router.get("/getCollegeEducation", verifyToken, getCollegeEducation);
Router.get("/getSchoolEducation", verifyToken, getSchoolEducation);
Router.get("/getEducationList", verifyToken, getEducationList);
Router.delete("/deleteEducation/:id", verifyToken, deleteEducation);


// Mentor Work Experience Routes
Router.post("/addWorkExperience", verifyToken, addWorkExperience);
Router.get("/getWorkExperiences", verifyToken, getAllWorkExperiences);
Router.put("/updateWorkExperience/:id", verifyToken, updateWorkExperience);
Router.delete("/deleteWorkExperience/:id", verifyToken, deleteWorkExperience);
Router.get(
  "/getSingleWorkExperience/:id",
  verifyToken,
  getSingleWorkExperience
);


module.exports = Router;
