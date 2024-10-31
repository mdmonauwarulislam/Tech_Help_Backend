const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  tagline: {
    type: String,
  },
  skills: {
    type: String,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Skill', skillSchema);
