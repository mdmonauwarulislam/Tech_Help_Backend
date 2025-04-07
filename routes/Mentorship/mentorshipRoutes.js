const express = require("express");
const {
  getMentorProfile,
  updateMentorProfile,
  getMentors,
  getMentorById
} = require("../../controllers/Mentorship/mentorController");
const { verifyToken } = require("../../middleware/authMiddleware");
const {
  addCollegeEducation,
  addSchoolEducation,
  getCollegeEducation,
  getSchoolEducation,
  getEducationList,
  deleteEducation,
} = require("../../controllers/addEducationController");
const {
  addWorkExperience,
  getAllWorkExperiences,
  updateWorkExperience,
  deleteWorkExperience,
  getSingleWorkExperience,
} = require("../../controllers/experienceController");
const upload = require("../../middleware/multerMiddle");

// service routes
const {
  createService,
  updateService,
  deleteService,
  getSingleService,
  getAllServices,
} = require("../../controllers/Mentorship/serviceController");

// Booking routes
const {
  createBooking,
  respondToBooking,
  initiatePayment,
  verifyPayment,
  getMentorBookings,
  getMenteeBookings,
  getStudentBookings,
  getStudentBookingById,
} = require("../../controllers/Mentorship/bookingController");
const Router = express.Router();

// GET Mentor Profile
Router.get("/profile", verifyToken, getMentorProfile);

Router.get("/me", getMentors);
Router.get("/me/:mentorId", getMentorById);

// UPDATE Mentor Profile
Router.put(
  "/profile/update",
  verifyToken,
  upload.single("profileImage"),
  updateMentorProfile
);

//upload the profile image
Router.post("/upload-profile", upload.single("profileImage"));
// Mentor Education Routes

Router.post("/addCollegeEducation", verifyToken, addCollegeEducation);
Router.post("/addSchoolEducation", verifyToken, addSchoolEducation);

Router.get("/getCollegeEducation", verifyToken, getCollegeEducation);
Router.get("/getSchoolEducation", verifyToken, getSchoolEducation);
Router.get("/getEducationList", verifyToken, getEducationList);
Router.get("/getEducationList/:id",  getEducationList);
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

// Service Routes
Router.post("/createService", verifyToken, createService);
Router.put("/updateService/:id", verifyToken, updateService);
Router.delete("/deleteService/:id", verifyToken, deleteService);
Router.get("/getSingleService/:id", verifyToken, getSingleService);
Router.get("/getAllServices", verifyToken, getAllServices);

// Booking Routes
Router.post("/createBooking", verifyToken, createBooking);
Router.put("/respondToBooking/:id", verifyToken, respondToBooking);
Router.post("/initiatePayment/:id", verifyToken, initiatePayment);
Router.post("/verifyPayment", verifyToken, verifyPayment);
Router.get("/getMentorBookings", verifyToken, getMentorBookings);
Router.get("/getMenteeBookings", verifyToken, getStudentBookings);
Router.get("/getStudentBookings/:id", getStudentBookingById);




module.exports = Router;
