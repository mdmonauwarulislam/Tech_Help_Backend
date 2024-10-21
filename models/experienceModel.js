const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  internshipType: {
    type: String,
  },
  companyLink: {
    type: String,
  },
  internshipTitle: {
    type: String,
  },
  location: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  currentlyWorking: {
    type: Boolean,
    default: false,
  },
  projectDetails: [{
    type: String,
  }],
  skillsUsed: [{
    type: String,
  }],
  certificateLink: {
    type: String,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('WorkExperience', workExperienceSchema);
