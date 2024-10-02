const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    aboutCompany: {
      type: String,
      required: true,
    },
    companyType: {
      type: String,
      required: true,
    },
    companyAddress: {
      type: String,
      required: true,
    },
    industryType: {
      type: String,
      required: true,
    },
    companySize: {
      type: String,
      required: true,
    },
    companyWebsite: {
      type: String,
      required: true,
    },
    jobposted:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Job"
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);