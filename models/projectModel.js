const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: [{
      type: String,
    }],
    skills: [{
      type: String,
    }],
    links: [
      {
        linkTitle: { type: String, },
        value: { type: String, },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
