import React, { useState } from "react"; // Import useState
import { Link } from "react-router-dom";

const CreateJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    jobRoles: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
    vacancies: "",
    endDate: "",
    country: "",
    city: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Log formData to ensure description is captured
      console.log("🔍 Form Data Before Submission:", formData);

      const payload = {
        title: formData.jobTitle,
        description: formData.description.trim(),
        jobRole: formData.jobRoles,
        minSalary: Number(formData.minSalary),
        maxSalary: Number(formData.maxSalary),
        vacancies: Number(formData.vacancies),
        endDate: formData.endDate,
        location: {
          country: formData.country,
          city: formData.city,
        },
      };

      console.log("🚀 Payload Being Sent:", JSON.stringify(payload, null, 2)); // Log payload before sending

      const response = await fetch("http://localhost:8000/api/v1/job/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok) {
        setShowPopup(true);

        // Reset form
        setFormData({
          jobTitle: "",
          description: "",
          jobRoles: "",
          jobType: "",
          minSalary: "",
          maxSalary: "",
          vacancies: "",
          endDate: "",
          country: "",
          city: "",
        });

        setTimeout(() => setShowPopup(false), 3000);
      } else {
        console.error("❌ Failed to create job:", responseData);
        alert(`Error: ${responseData.error || "Unknown error occurred"}`);
      }
    } catch (error) {
      console.error("🚨 Error during job creation:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-900">
          Create a Job
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Find the best talent for your company
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block font-semibold">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Add job title, role vacancies etc"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              placeholder="Job Description (Max 100 words)"
              rows="4"
              onInput={(e) => {
                const words = e.target.value.trim().split(/\s+/);
                if (words.length > 100) {
                  e.target.value = words.slice(0, 100).join(" ");
                }
              }}
              required
            ></textarea>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block font-semibold">Job Roles</label>
            <input
              type="text"
              name="jobRoles"
              value={formData.jobRoles}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Job roles, responsibilities..."
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              required
            >
              <option>Select Job Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Remote</option>
              <option>Internship</option>
            </select>
          </div>

          <div className="col-span-2">
            <h5 className="font-bold text-lg mb-3">Salary</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold">Min Salary</label>
                <div className="flex border border-gray-300 rounded-md">
                <input
                  type="number"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Min Salary..."
                  required
                />
                <span className="px-4 bg-gray-200 flex items-center rounded-r-md">INR</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold">Max Salary</label>
                <div className="flex border border-gray-300 rounded-md">
                <input
                  type="number"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Max Salary..."
                  required
                />
                <span className="px-4 bg-gray-200 flex items-center rounded-r-md">INR</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block font-semibold">Vacancies</label>
            <input
              type="number"
              name="vacancies"
              value={formData.vacancies}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Number of Vacancies"
              required
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block font-semibold">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div className="col-span-2">
            <h5 className="font-bold text-lg mb-3">Location</h5>
            <label className="block font-semibold">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
             <label className="block font-semibold mt-4">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none "
              required
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
          >
            Create
          </button>
        </div>

        {showPopup && (
          <div className="fixed bottom-10 right-10 p-4 rounded-md shadow-lg bg-green-500  text-white">
          Job created successfully!
        </div>
        )}
      </div>
    </form>
  );
};

export default CreateJobForm;
