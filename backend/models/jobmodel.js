import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    jobRole: { type: String, required: true },
    minSalary: { type: Number, required: true },
    maxSalary: { type: Number, required: true },
    vacancies: { type: Number, required: true },
    endDate: { type: Date, required: true },
    location: {
      country: { type: String, required: true },
      city: { type: String, required: true },
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobApplication" }],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);