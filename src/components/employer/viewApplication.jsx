import React, { useState, useEffect } from "react";
import profileImg from "../employer/profile.png";
import { useParams } from "react-router-dom";

const JobApplication = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [shortlisted, setShortlisted] = useState([]);
  const [filter, setFilter] = useState("applicants");
  const [error, setError] = useState(null);

  const API_URL = `http://localhost:8000/api/v1/job/jobs/${jobId}/applicants`;

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        const extractedApplicants = (data.applicants || []).map((applicantData) => ({
          id: applicantData._id,
          name: `${applicantData.firstName} ${applicantData.lastName}`,
          role: applicantData.position || "UI / UX Designer",
          experience: `${applicantData.experience} year` || "0+ Years",
          education: applicantData.education || "Not Provided",
          applied: new Date(applicantData.createdAt).toLocaleDateString(),
          image: applicantData.image || "https://via.placeholder.com/150",
        }));

        setApplicants(extractedApplicants);
        setShortlisted(data.shortlisted || []);

        localStorage.setItem(`job_${jobId}`, JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching applicants:", error);
        setError("Failed to load applicants. Please try again.");
      }
    };

    fetchApplicants();
  }, [jobId]);

  const displayedApplicants = filter === "applicants" ? applicants : shortlisted;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col items-center">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-700">
        Job Application
      </h1>
  
      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}
  
      {/* Mobile Filter */}
      <div className="md:hidden flex justify-center mb-4 w-full">
        <select
          className="p-2 border rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="applicants">All Applicants</option>
          <option value="shortlisted">Shortlisted</option>
        </select>
      </div>
  
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full justify-center">
        {/* Applications Section */}
        <div className="bg-[#F8F9FA] rounded-lg shadow-lg p-4 md:p-6 md:col-span-2 w-full">
          <h2 className="text-lg font-bold mb-4 text-center">
            {filter === "applicants" ? "All Applications" : "Shortlisted Candidates"}
            <span className="text-gray-500"> {displayedApplicants.length}</span>
          </h2>
  
          {/* Applicants Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full justify-center">
            {displayedApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="bg-white shadow-md rounded-lg p-5 border flex flex-col transition hover:shadow-lg items-center text-center w-full"
              >
                {/* Profile Image & Name */}
                <div className="flex flex-col items-center">
                  <img
                    src={profileImg}
                    alt={applicant.name}
                    className="h-14 w-14 rounded-full border"
                  />
                  <div className="mt-2">
                    <h3 className="font-semibold text-lg">{applicant.name}</h3>
                    <p className="text-sm text-gray-500">{applicant.role}</p>
                  </div>
                </div>
  
                {/* Applicant Details */}
                <div className="mt-4 text-sm text-gray-600 w-full">
                  <p className="flex items-center justify-center gap-1">
                    📚 <span>Education: {applicant.education}</span>
                  </p>
                  <p className="flex items-center justify-center gap-1">
                    💼 <span>Experience: {applicant.experience}</span>
                  </p>
                  <p className="flex items-center justify-center gap-1">
                    📅 <span>Applied: {applicant.applied}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default JobApplication;
