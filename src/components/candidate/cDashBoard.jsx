import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaBriefcase, FaHeart } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import einfratechLogo from "../candidate/Einfratech.png";

const JobDescriptionPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [jobStatus, setJobStatus] = useState([]);
  const [jbCount, setJbCount] = useState(0);
  const id=localStorage.getItem("userId");

  const storedName = localStorage.getItem("fullName");

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/job/user-applied-jobs/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched Data:", data);

        if (Array.isArray(data)) {
          setJobStatus(data);
          setJbCount(data.length);
        } else if (data.appliedJobs && Array.isArray(data.appliedJobs)) {
          setJobStatus(data.appliedJobs);
          setJbCount(data.appliedJobs.length);
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch(error => console.error("Error fetching job data:", error));
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto p-4">
      {/* Navbar */}
      <nav className="bg-white shadow-md flex justify-between items-center">
        <img className="w-22 h-12" src={einfratechLogo} alt="Logo" />
        <div className="items-center space-x-6 hidden md:block">
          <Link
            to="/dashboard"
            className="text-gray-700 font-semibold hover:text-blue-900"
          >
            Dashboard
          </Link>
          <Link to="/jobs" className="text-gray-700 hover:text-blue-900">
            Jobs
          </Link>
        </div>
        <button
          className="md:hidden ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FiMenu className="text-2xl text-gray-700" />
        </button>
        <Link to="/profiledashboard" className="hidden md:block">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        </Link>
      </nav>

      {/* Candidate Dashboard */}
      <div className="mt-6 px-4 md:px-12">
        <h2 className="text-2xl font-bold">{storedName}</h2>
        <p className="text-gray-600">
          Here is your daily activity and job alerts.
        </p>
      </div>

      {/* Job Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 px-4 md:px-12">
        <div className="flex items-center justify-between p-4 bg-purple-100 rounded-md shadow-sm">
          <div>
            <h3 className="text-2xl font-bold">{jbCount}</h3>
            <p className="text-gray-700">Applied Jobs</p>
          </div>
          <FaBriefcase className="text-gray-600 text-2xl" />
        </div>
        <div className="flex items-center justify-between p-4 bg-yellow-100 rounded-md shadow-sm">
          <div>
            <h3 className="text-2xl font-bold">0</h3>
            <p className="text-gray-700">Favorite Jobs</p>
          </div>
          <FaHeart className="text-red-500 text-2xl" />
        </div>
        <div className="flex items-center justify-between p-4 bg-green-100 rounded-md shadow-sm">
          <div>
            <h3 className="text-2xl font-bold">0</h3>
            <p className="text-gray-700">Job Alerts</p>
          </div>
          <IoNotificationsOutline className="text-blue-700 text-2xl" />
        </div>
      </div>

      {/* Recently Applied Jobs */}
      <div className="mt-8 px-4 md:px-12">
        <h3 className="text-lg font-semibold">Recently Applied</h3>
        <div className="mt-3 p-3 rounded-md">
          {jobStatus.length > 0 ? (
            jobStatus.map((jobApp, index) => (
              <div
                key={jobApp._id || index}
                className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-[0_4px_4px_0_rgba(0,0,0,0.1)] mb-3"
              >
                {/* Job Details */}
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <img
                    src="https://play-lh.googleusercontent.com/XHAMg2tievEEjzTo91f7bCtBjjX6svmgDcPYFKCd3iHSqzG3wd3BajNZftOyjfMg4g"
                    alt="Company Logo"
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="font-semibold text-sm">
                      {jobApp.job?.title || "Unknown Job"}
                      <span className="bg-gray-300 text-gray-700 px-2 rounded text-xs">
                        {jobApp.job?.location?.city || "N/A"}
                      </span>
                    </p>
                    <p className="text-gray-500 text-xs">
                      {jobApp.job?.location?.city || "Unknown"} - ₹
                      {jobApp.job?.minSalary} to ₹{jobApp.job?.maxSalary}
                    </p>
                  </div>
                </div>

                {/* Job End Date */}
                <p className="text-gray-600 text-sm w-full md:w-auto text-center md:text-left">
                  {jobApp.job?.endDate
                    ? new Date(jobApp.job.endDate).toDateString()
                    : "N/A"}
                </p>

                {/* Job Status */}
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full w-full md:w-auto text-center md:text-left ${
                    jobApp.status === "Accepted"
                      ? "bg-green-200 text-green-700"
                      : jobApp.status === "Rejected"
                      ? "bg-red-200 text-red-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {jobApp.status || "Pending"}
                </span>

                {/* View Button */}
                <Link
                  to="/jobdescription"
                  className="border border-blue-700 text-blue-700 px-6 py-2 text-sm rounded-md hover:bg-blue-900 hover:text-white w-full md:w-auto text-center"
                >
                  View
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No applied jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionPage;
