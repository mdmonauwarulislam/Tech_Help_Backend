const mongoose = require("mongoose");

const ResponsibilitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    responsibilities: [{
      type: String,
    }],
    certificateLink: {
      type: String,
    },
    skills: [{
      type: String, 
    }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Responsibility", ResponsibilitySchema);
