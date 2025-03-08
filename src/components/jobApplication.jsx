import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const JobApplicationForm = () => {
  const { jobId } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    employmentStatus: "",
    education: "",
    experience: 0,
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    console.log("Current Job ID:", jobId);
  }, [jobId]);

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone number must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        employmentStatus: formData.employmentStatus,
        education: formData.education,
        experience: formData.experience,
        resume: formData.resume || "",
      };
      

      const response = await axios.post(
        `http://localhost:8000/api/v1/job/jobs/${jobId}/apply`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Application submitted successfully:", response.data);

      // Show success popup
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        employmentStatus: "",
        education: "",
        experience: 0,
        resume: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Failed to submit application: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        employmentStatus: checked ? value : "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === "resume" ? files[0] : value,
      });
    }
  };

  return (
    <div
      className="container mt-5 p-5"
      style={{
        maxWidth: "800px",
        backgroundColor: "#f8f9fa",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.15)",
      }}
    >
      <h1
        className="mb-4 text-center"
        style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1E3A8A" }}
      >
        Job Application
      </h1>

      <form onSubmit={handleSubmit}>
        {/* First & Last Name */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              name="firstName"
              className="form-control"
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <div className="text-danger">{errors.firstName}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <div className="text-danger">{errors.lastName}</div>
            )}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phoneNumber && (
              <div className="text-danger">{errors.phoneNumber}</div>
            )}
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <label className="form-label">Education Level</label>
            <select
              className="form-select"
              name="education"
              value={formData.education}
              onChange={handleChange}
            >
              <option>Select Education</option>
              <option>High School</option>
              <option>Bachelor's Degree</option>
              <option>Master's Degree</option>
              <option>PhD</option>
            </select>
          </div>


          <div className="col-md-6">
            <label className="form-label">Experience</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter job experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Employment Status */}
        <div className="mb-4">
          <label className="form-label">Employment Status</label>
          <div className="d-flex flex-wrap gap-3">
            {["Employed", "Self-Employed", "Unemployed", "Student"].map(
              (status, index) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={status}
                    checked={formData.employmentStatus === status}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{status}</label>
                </div>
              )
            )}
          </div>
        </div>

        {/* Resume Upload */}
        <div className="mb-4">
          <label className="form-label">Upload Resume</label>
          <input
            type="file"
            className="form-control"
            name="resume"
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: "#1E3A8A",
              borderColor: "#1E3A8A",
              fontSize: "20px",
              padding: "12px 60px",
            }}
          >
            Apply
          </button>
        </div>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed bottom-10 right-10 p-4 rounded-md shadow-lg bg-green-500 text-white">
          Job application submitted successfully!
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
