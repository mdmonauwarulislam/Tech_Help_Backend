const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
    activity: {
      type: String,
    },
  },
  {timestamps: true,}
);

module.exports = mongoose.model("Achievement", achievementSchema);
