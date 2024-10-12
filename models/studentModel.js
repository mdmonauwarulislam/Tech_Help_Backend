const mongoose = require("mongoose");
const studentModel = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dxkufsejm/image/upload/v1634221237/blank-profile-picture-973460_640_izx7qf.png",
    },
    domainOfIntrest: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SkillDomain",
    }],
    university: {
      type: String,
    },
    graduationYear: {
      type: Number,
    },
    skills: [
      {
        type: String,
      },
    ],
    hometstate: {
      type: String,
    },
    githubProfile: {
      type: String,
    },
    linkedinProfile: {
      type: String,
    },
    socialPlateform : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "SocialPlateform"
    }],
    jobApplied: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    mentorshipsession: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
      },
    ],
    blogPost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentModel);
