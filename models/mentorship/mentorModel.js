const mongoose = require("mongoose");

const MentorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  role: { type: String, default: "Mentor" },
  profileImage: { type: String },
  currentOrganization: { type: String },
  currentIndustry: { type: String },
  about: { type: String },
  socialMedia: {
    linkedin: { type: String },
    facebook: { type: String },
    github: { type: String },
    instagram: { type: String },
  },
  skills: [{ type: String }],
  topics: [{ type: String }],
  workExperience: [
    {
      company: { type: String, required: true },
      position: { type: String, required: true },
      startYear: { type: Number, required: true },
      endYear: { type: Number },
    },
  ],
  education: [
    {
      institute: { type: String, required: true },
      degree: { type: String, required: true },
      startYear: { type: Number, required: true },
      endYear: { type: Number },
    },
  ],
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
});

module.exports = mongoose.model("Mentor", MentorSchema);
