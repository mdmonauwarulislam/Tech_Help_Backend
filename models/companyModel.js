const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      
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
   
    },
    companyLogo: {
      type: String,
    },
    companyType: {
      type: String,
    
    },
    companyAddress: {
      type: String,
    
    },
    industryType: {
      type: String,
    },
    companySize: {
      type: String,
      
    },
    companyWebsite: {
      type: String,
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