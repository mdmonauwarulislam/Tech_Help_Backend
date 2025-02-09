const express = require("express");
const Roadmap = require("../models/roadmapModel");

const router = express.Router();

// Get all roadmaps
router.get("/getroadmaps", async (req, res) => {
  const roadmaps = await Roadmap.find();
  res.json(roadmaps);
});

// Get a specific roadmap by ID
router.get("getroadmap/:id", async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.id);
  if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });
  res.json(roadmap);
});

// Create a new roadmap
router.post("/createroadmap", async (req, res) => {
  const { name, nodes, edges } = req.body;
  const newRoadmap = new Roadmap({ name, nodes, edges });
  await newRoadmap.save();
  res.status(201).json(newRoadmap);
});

// Update a roadmap
router.put("updateroadmap/:id", async (req, res) => {
  const { name, nodes, edges } = req.body;
  const updatedRoadmap = await Roadmap.findByIdAndUpdate(
    req.params.id,
    { name, nodes, edges },
    { new: true }
  );
  res.json(updatedRoadmap);
});

// Delete a roadmap
router.delete("/:id", async (req, res) => {
  await Roadmap.findByIdAndDelete(req.params.id);
  res.json({ message: "Roadmap deleted" });
});

module.exports = router;
