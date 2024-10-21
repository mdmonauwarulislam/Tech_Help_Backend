const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  descriptionPoints: [{
    type: String
  }],
  completionMonth: {
    type: String,
  },
  completionYear: {
    type: Number,
  },
  certificationLink: {
    type: String,
  },
  skills: [{
    type: String
  }],
  
}, { timestamps: true });


module.exports = mongoose.model('Certification', CertificationSchema);
