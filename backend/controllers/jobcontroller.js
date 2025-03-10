import { Job } from "../models/jobmodel.js";
import { JobApplication } from "../models/jobapplication.js";
import mongoose from "mongoose";

// Create a new job
export const createJob = async (req, res) => {
  try {
    console.log("📌 Received Payload:", req.body); 
    const { title, description, jobRole, minSalary, maxSalary, vacancies, endDate, location } = req.body;

    const newJob = new Job({
      title,
      description,
      jobRole,
      minSalary,
      maxSalary,
      vacancies,
      endDate,
      location,
      created_by: req.user.id, // Assuming req.user.id contains logged-in employer ID
    });

    await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a list of all jobs
export const getAllJobs = async (req, res) => {
  try {
      const jobs = await Job.find(); 
      res.status(200).json(jobs);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Get all candidates who applied for a specific job
export const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: { path: "applicant", select: "firstName lastName email phoneNumber education" },
    });

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ applicants: job.applications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Apply for a job
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { firstName, lastName, email, phoneNumber, employmentStatus, education, experience, resume } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Create a new job application with experience
    const application = new JobApplication({
      job: jobId,
      applicant: req.user._id, 
      firstName,
      lastName,
      email,
      phoneNumber,
      employmentStatus,
      education,
      experience: Number(experience) || 0, // Convert to number
      resume,
    });
    

    await application.save();

    job.applications.push(application._id);
    await job.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.error("Error submitting application:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// get jobs by user Id
export const getJobsByUser = async (req, res) => {
  try {
    const { employerId } = req.query; 

    if (!employerId) {
      return res.status(400).json({ success: false, message: "Employer ID is required" });
    }

    const jobs = await Job.find({ created_by: new mongoose.Types.ObjectId(employerId) }).sort({ createdAt: -1 });

    if (!jobs.length) {
      return res.status(404).json({ success: false, message: "No jobs found for this employer" });
    }

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get job details by jobId
export const getJobById = async (req, res) => {
  try {
      const job = await Job.findById(req.params.id);
      if (!job) {
          return res.status(404).json({ message: 'Job not found' });
      }
      res.json(job);
  } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// get applied  job by user Id

export const getAppliedJobsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; 

    // Find job applications where the applicant ID matches the provided userId
    const applications = await JobApplication.find({ applicant: userId })
      .populate({
        path: "job", 
        select: "title jobRole location minSalary maxSalary endDate createdAt",
      })
      .select("status createdAt");

    if (!applications.length) {
      return res.status(404).json({ message: "No applied jobs found for this user" });
    }

    res.status(200).json({ appliedJobs: applications });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
