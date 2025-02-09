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
Router.get("/getjobs", verifyToken,verifyRole(["admin", "company", "student"]), getJobs);
Router.get("/getjob/:id", verifyToken,verifyRole(["admin", "company", "student"]), getJob);
Router.post("/applyjob/:id", verifyToken,verifyRole(["student"]), applyJob);
Router.get("/getappliedjobs", verifyToken,verifyRole(["student"]), getAppliedJobs);
Router.get("/getpostedjobs", verifyToken,verifyRole(["company"]), getPostedJobs);
Router.put("/updatejob/:id", verifyToken, verifyRole(["company"]), updateJob);
Router.delete("/deletejob/:id", verifyToken,verifyRole(["company", "admin"]), deleteJob);

module.exports = Router;