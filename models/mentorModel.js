const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  experties: {
    type: String,
  },
  profilePicture: {
    type: String,
    default:
      "https://res.cloudinary.com/dxkufsejm/image/upload/v1634221237/blank-profile-picture-973460_640_izx7qf.png",
  },
  yearofexperience: {
    type: Number,
  },
  company: {
    type: String,
  },
  about: [
    {
      type: String,
      
    },
  ],
  languages: [
    {
      type: String,
     
    },
  ],
  skills: [
    {
      type: String,
      
    },
  ],
  category: { type: String },
  education:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddEducation"
  }],
  experience: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkExperience"
  }],
  services : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
    }
  ],  
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  }],
  password: {
    type: String,
    required: true,
  },
  availability: [{ type: String }],
});

module.exports = mongoose.model("Mentor", mentorSchema);
