import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../admindash/adminnavbar";
import humanIcon from "../admindash/human.png";
import imageIcon from "../admindash/image1.png";
import graphIcon from "../admindash/graph.png";
import bagIcon from "../admindash/bag.png";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/user/unverified-users"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setUsers(data.users || data);
        setFilteredUsers(data.users || data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.type === filter));
    }
  }, [filter, users]);

  const handleApprove = async (userId) => {
    try {
      console.log(userId);
      const response = await fetch(
        `http://localhost:8000/api/v1/admin/user/approve-reject/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "approve", role: "Admin" }), // Ensure role is passed
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setApprovedUsers([...approvedUsers, userId]);
        setRejectedUsers(rejectedUsers.filter((id) => id !== userId));
        alert(data.message); // Show success message
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleReject = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/admin/user/approve-reject/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "reject", role: "Admin" }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRejectedUsers([...rejectedUsers, userId]);
        setApprovedUsers(approvedUsers.filter((id) => id !== userId));
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };


  async function getJobCount() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/job/jobs");

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const jobs = await response.json();
        setJobCount(jobs.length);
        console.log("Total Jobs:", jobCount);
        return jobs.length; // Return the job count

    } catch (error) {
        console.error("Failed to fetch jobs:", error);
        return 0; // Return 0 if an error occurs
    }
}

getJobCount();




  const cards = [
    {
      value: users.length,
      label: "Pending Users",
      color: "bg-green-100",
      image: imageIcon,
      link: "/",
    },
    {
      value: users.filter((user) => user.role === "Employer").length,
      label: "Pending Employers",
      color: "bg-purple-100",
      image: graphIcon,
      link: "/",
    },
    {
      value: jobCount,
      label: "Posted Jobs",
      color: "bg-indigo-100",
      image: bagIcon,
      link: "/postedjobs",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow ${card.color} text-center`}
            >
              <div className="mx-auto w-16 h-16 bg-white p-2 rounded-full shadow">
                <img src={card.image} alt="icon" className="w-full h-full" />
              </div>
              <h4 className="text-xl font-bold mt-2">{card.value}</h4>
              <p className="text-gray-600">{card.label}</p>
              <Link
                to={card.link}
                className="mt-2 inline-block bg-white py-1 px-3 rounded shadow"
              >
                View Details <FontAwesomeIcon icon={faEye} />
              </Link>
            </div>
          ))}
        </div>

        {/* Users Section */}
        <h3 className="text-center text-2xl font-bold mt-6">Users</h3>
        <p className="text-center text-gray-500">
          Find The People’s Journey With Us
        </p>

        {loading ? (
          <p className="text-center">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left hidden md:table-cell">
                    User Type
                  </th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-3 flex items-center">
                      <img
                        src={humanIcon}
                        alt="User"
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <div>
                        <strong>{user.fullName}</strong>
                        <br />
                        <small className="text-gray-500">{user.email}</small>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded `}>Pending</span>
                    </td>
                    <td className="p-3 hidden md:table-cell">{user.role}</td>
                    <td className="p-3 flex flex-col md:flex-row gap-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => handleApprove(user._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleReject(user._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
