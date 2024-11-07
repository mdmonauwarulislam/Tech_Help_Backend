const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: [{
        requirement : { type: String, required: true },
        responsibility: { type: String, required: true },
  }],
    type: {
        type: String,
        enum: ["full-time", "part-time", "internship"],
        required: true,
    },
    salary: [{
        minimum : { type: Number, required: true },
        maximum : { type: Number, required: true },
    }],
    experience: {
        type: Number,
        required: true,
    },
    workmode:{
        type : String,
        enum : ["remote", "onsite", "hybrid"],
        required : true
    },
    education: {
        type: String,
        enum: ["bachelors", "masters", "phd", "other"],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    skills: [{
        type: String,
    }],
    location: {
      type: String,
      required: true,
    },
    applicants: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
        appliedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);