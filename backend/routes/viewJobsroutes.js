import express from "express";
import JobApplication from "../models/jobapplication.js";


const router = express.Router();

// Create a job application
router.post("/", async (req, res) => {
  try {
    const job = new JobApplication(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all job applications
router.get("/", async (req, res) => {
  try {
    const jobs = await JobApplication.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update job application status
router.put("/:id", async (req, res) => {
  try {
    const job = await JobApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a job application
router.delete("/:id", async (req, res) => {
  try {
    await JobApplication.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;