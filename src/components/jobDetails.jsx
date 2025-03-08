import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdWallet } from "react-icons/io";
import axios from "axios";
import { IoIosNotifications } from "react-icons/io";
import { TiTime } from "react-icons/ti";
import { PiBagBold } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const JobDetails = () => {
  const { id } = useParams(); // Get jobId from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        console.log(id);
        const response = await fetch(`http://localhost:8000/api/v1/job/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }

        const data = await response.json();
        console.log(data);
        setJob(data);
      } catch (err) {
        setError("Failed to fetch job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <p className="text-center">Loading job details...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div>
      <h1
        className="mb-4 text-center"
        style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1E3A8A" }}
      >
        Job Details
      </h1>

      <div className="container mt-5">
        <div className="row g-4 justify-content-center">
{/* Left - Job Description */}
<div className="col-lg-8 col-md-12 mb-4">
  <div className="p-4 rounded-4 shadow-sm bg-light text-center">
    <p
      className="mb-4"
      style={{
        fontSize: "1.7rem",
        fontWeight: "bold",
        color: "#1E3A8A",
      }}
    >
      {job?.title || "Job Position"}
    </p>

    <div className="d-flex justify-content-center">
      <img
        src="https://img.freepik.com/premium-vector/career-concept-illustration-idea-job-progress-wealth_277904-445.jpg?semt=ais_hybrid"
        alt="Career"
        className="img-fluid rounded my-3"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>

    <h4 className="fw-bold mt-4 mb-4">Job Description</h4>
    <p className="text-start">
      {job?.description || "No description available"}
    </p>
  </div>
</div>

{/* Right - Job Information Panel */}
<div className="col-lg-3 col-md-12 pb-4">
  <div className="card p-4 shadow-sm text-center d-flex flex-column align-items-center bg-light w-100">
    <p className="mb-2">Job Role</p>
    <p className="fw-bold" style={{ fontSize: "1.5rem" }}>
      {job?.jobRole || "Company Name"}
    </p>
    <hr className="w-100" />

    {/* Job Type */}
    <div className="mb-3 d-flex align-items-center w-100">
      <PiBagBold size={20} className="me-3 text-primary" />
      <div className="text-start">
        <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>Job Type:</p>
        <strong className="fs-6">{job?.jobType || "Full-Time"}</strong>
      </div>
    </div>

    {/* Location */}
    <div className="mb-3 d-flex align-items-center w-100">
      <IoLocationSharp size={20} className="me-3 text-primary" />
      <div className="text-start">
        <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>Location:</p>
        <strong className="fs-6">
          {job.location?.city}, {job.location?.country}
        </strong>
      </div>
    </div>

    {/* Salary */}
    <div className="mb-3 d-flex align-items-center w-100">
      <IoMdWallet size={20} className="me-3 text-primary" />
      <div className="text-start">
        <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>Salary:</p>
        <strong className="fs-6">
          {job?.minSalary && job?.maxSalary
            ? `₹${job.minSalary} - ₹${job.maxSalary}`
            : `₹${job?.maxSalary || job?.minSalary || "10,000"}`}
        </strong>
      </div>
    </div>

    {/* Posted Date */}
    <div className="mb-3 d-flex align-items-center w-100">
      <TiTime size={20} className="me-3 text-primary" />
      <div className="text-start">
        <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>Posted On:</p>
        <strong className="fs-6">
          {new Date(job?.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </strong>
      </div>
    </div>

    {/* Expire Date */}
    <div className="mb-3 d-flex align-items-center w-100">
      <IoIosNotifications size={20} className="me-3 text-primary" />
      <div className="text-start">
        <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>Expire Date:</p>
        <strong className="fs-6">
          {new Date(job?.endDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </strong>
      </div>
    </div>

    {/* Apply Now Button */}
    <Link
      to={`/jobapplication/${job._id}`}
      className="btn w-100 rounded-3 text-white"
      style={{ background: "#1E3A8A" }}
    >
      Apply Now
    </Link>
  </div>
</div>


        </div>
      </div>
    </div>
  );
};

export default JobDetails;
