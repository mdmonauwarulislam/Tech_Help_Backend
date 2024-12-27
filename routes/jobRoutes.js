const express = require("express");
const Router = express.Router();

const {
  createJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob,
  applyJob,
  getAppliedJobs,
  getPostedJobs,
} = require("../controllers/jobController");

const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

Router.post("/createjob", verifyToken, verifyRole(["company"]), createJob);
Router.get("/getjobs", verifyToken,verifyRole(["Admin", "company", "Student"]), getJobs);
Router.get("/getjob/:id", verifyToken,verifyRole(["Admin", "company", "Student"]), getJob);
Router.post("/applyjob/:id", verifyToken,verifyRole(["Student"]), applyJob);
Router.get("/getappliedjobs", verifyToken,verifyRole(["Student"]), getAppliedJobs);
Router.get("/getpostedjobs", verifyToken,verifyRole(["company"]), getPostedJobs);
Router.put("/updatejob/:id", verifyToken, verifyRole(["company"]), updateJob);
Router.delete("/deletejob/:id", verifyToken,verifyRole(["company", "Admin"]), deleteJob);

module.exports = Router;