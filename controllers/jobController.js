const httpsStatusCode = require("../constant/httpsStatusCode");
const Job = require("../models/jobModel");
const studentModel = require("../models/studentModel");

// Create a new job
const createJob = async (req, res) => {
  let role = req.user?.user?.role;
  if (!["company"].includes(role)) {
    return res.status(403).json({ message: "Only Company can create jobs" });
  }

  try {
    const {
      title,
      description,
      type,
      salary,
      experience,
      workmode,
      education,
      location,
      skills,
    } = req.body;
    console.log(req.user);
    const newJob = new Job({
      title,
      description,
      type,
      salary,
      experience,
      workmode,
      education,
      location,
      skills,
      createdBy: req.user?.user?.userId,
    });
    console.log(newJob);

    const savedJob = await newJob.save();
    res
      .status(201)
      .json({ message: "Job created successfully", job: savedJob });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create job", error: error.message });
  }
};

// Get all jobs
const getJobs = async (req, res) => {
  try {
    let role = req.user?.user?.role;
    console.log(role);
    let jobs;

    if (role === "company") {
      jobs = await Job.find({ createdBy: req.user.id }).populate("createdBy");
    } else if (role === "admin" || role === "student") {
      jobs = await Job.find().populate("createdBy");
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json({ jobs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch jobs", error: error.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    let role = req.user?.user?.role;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check permissions
    if (role !== "company" && job.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this job" });
    }

    Object.assign(job, req.body);
    const updatedJob = await job.save();

    res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update job", error: error.message });
  }
};

const getJob = async (req, res) => {
  try {
    let role = req.user?.user?.role;
    const job = await Job.findById(req.params.id).populate("createdBy");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Admin and Student can view any job; Companies can view only their own jobs
    if (
      role === "admin" ||
      role === "student" ||
      (role === "company" && job.createdBy.toString() === req.user.id)
    ) {
      return res.status(200).json({ job });
    }

    res.status(403).json({ message: "Access denied" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch job", error: error.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Only Admin or the job creator can delete the job
    if (
      role === "Admin" ||
      role === "company" ||
      job.createdBy.toString() === req.user.id
    ) {
      await job.remove();
      return res.status(200).json({ message: "Job deleted successfully" });
    }

    res.status(403).json({ message: "Access denied" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete job", error: error.message });
  }
};

// Apply to a job
const applyJob = async (req, res) => {
  try {
    if (req.user?.user?.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can apply for jobs" });
    }

    const job = await Job.findById(req.params.id);
    console.log("user req", req.user);
    const user = await studentModel.findById(req.user?.user?.userId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (!user) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const alreadyApplied = job.applicants.some(
      (applicant) => applicant?.userId?.toString() === user?._id
    );

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You have already applied to this job" });
    }

    job.applicants.push({ userId: user?._id });
    await job.save();

    user.jobApplied.push(job?._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Applied to job successfully",
      data: job,
    });
  } catch (error) {
    console.log("error to failed job:", error);
    res
      .status(500)
      .json({ message: "Failed to apply for job", error: error.message });
  }
};

// Get applied jobs (Student)
const getAppliedJobs = async (req, res) => {
  try {
    if (req.user.user.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can view applied jobs" });
    }

    const jobs = await Job.find({ "applicants.userId": req.user.id });

    res.status(200).json({ jobs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch applied jobs", error: error.message });
  }
};

// Get posted jobs (Company)
const getPostedJobs = async (req, res) => {
  try {
    if (req.user.user.role !== "company") {
      return res
        .status(403)
        .json({ message: "Only companies can view their posted jobs" });
    }

    const jobs = await Job.find({ createdBy: req.user.id });
    res.status(200).json({ jobs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch posted jobs", error: error.message });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  applyJob,
  getAppliedJobs,
  getPostedJobs,
};
