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
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-700">
        Job Application
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Mobile Filter */}
      <div className="md:hidden flex justify-center mb-4">
        <select
          className="p-2 border rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="applicants">All Applicants</option>
          <option value="shortlisted">Shortlisted</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Applications Section */}
        <div className="bg-[#F8F9FA] rounded-lg shadow-lg p-4 md:p-6 md:col-span-2">
          <h2 className="text-lg font-bold mb-4">
            {filter === "applicants"
              ? "All Applications"
              : "Shortlisted Candidates"}
            <span className="text-gray-500"> {displayedApplicants.length}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayedApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="bg-white shadow-md rounded-lg p-5 border flex flex-col transition hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={profileImg}
                    alt={applicant.name}
                    className="h-14 w-14 rounded-full border"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{applicant.name}</h3>
                    <p className="text-sm text-gray-500">{applicant.role}</p>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p className="flex items-center gap-1">
                    📚 <span>Education: {applicant.education}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    💼 <span>Experience: {applicant.experience}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    📅 <span>Applied: {applicant.applied}</span>
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    className="px-4 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition"
                    
                  >
                    Accept
                  </button>
                  <button
                    className="px-4 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                  
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shortlisted Section */}
        <div className="hidden md:block bg-[#F8F9FA] rounded-lg shadow-lg p-4 md:p-6">
          <h2 className="text-lg font-bold mb-4">
            Shortlisted{" "}
            <span className="text-gray-500">{shortlisted.length}</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {shortlisted.map((applicant) => (
              <div
                key={applicant.id}
                className="bg-white shadow-md rounded-lg p-5 border flex flex-col transition hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={profileImg}
                    alt={applicant.name}
                    className="h-14 w-14 rounded-full border"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{applicant.name}</h3>
                    <p className="text-sm text-gray-500">{applicant.role}</p>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p className="flex items-center gap-1">
                    📚 <span>Education: {applicant.education}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    💼 <span>Experience: {applicant.experience}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    📅 <span>Applied: {applicant.applied}</span>
                  </p>
                </div>

                <button className="mt-4 px-4 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;
