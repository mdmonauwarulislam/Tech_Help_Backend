const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    description: [
      {
        requirement: { type: String },
        responsibility: { type: String },
      },
    ],
    type: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship"]
    },
    salary: [
      {
        minimum: { type: Number },
        maximum: { type: Number},
      },
    ],
    experience: {
      type: Number
    },
    workmode: {
      type: String,
      enum: ["Remote", "Onsite", "Hybrid"],
      
    },
    education: {
      type: String,
      enum: ["High School","Diploma","Bachelors", "Masters", "PhD", "Others"]
    },
    location: {
      type: String
    },
    skills: [
      {
        type: String,
      },
    ],
    applicants: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending"
        },
        appliedAt: { type: Date, default: Date.now },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
