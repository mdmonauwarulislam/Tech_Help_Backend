const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nodes: { type: Array, required: true },
  edges: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Roadmap", roadmapSchema);
