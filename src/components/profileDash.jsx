// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaUser, FaCog, FaBell, FaSignOutAlt, FaTimes } from "react-icons/fa";
// import humanIcon from "../assets/profile.png";
// import profiledash from "../assets/profileDash.png";

// const ProfileDashboard = () => {

//     const localName = localStorage.getItem("fullName");
//     const localEmail = localStorage.getItem("email");


//   const [activeSection, setActiveSection] = useState(null);
//   const [notificationsEnabled, setNotificationsEnabled] = useState(true);
//   const [profile, setProfile] = useState({
//     name: "Rahul Sinha",
//     email: "rahul@gmail.com",
//     mobile: "+91 0000000000",
//     location: "Bangalore",
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen relative p-4">
//       <button onClick={() => window.location.href = "/"} className="absolute top-4 left-4 text-gray-600">
//         <FaTimes size={24} />
//       </button>
//       <div className={`transition-all duration-300 w-full max-w-3xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden bg-white`}>
//         <div className="w-full md:w-[40%] bg-white p-6 shadow-lg rounded-l-lg">
//           <div className="flex flex-col items-center">
//             <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 overflow-hidden">
//               <img src= {humanIcon} alt="Profile" className="w-full h-full object-cover" />
//             </div>
//             <h2 className="text-lg font-semibold">{localName}</h2>
//             <p className="text-gray-500">{localEmail}</p>
//           </div>
//           <div className="mt-6 space-y-3 w-full">
//             <button onClick={() => setActiveSection("profile")} className="flex items-center w-full p-3 hover:bg-gray-100 rounded">
//               <FaUser className="mr-3" /> My Profile
//             </button>
//             <button onClick={() => setActiveSection("settings")} className="flex items-center w-full p-3 hover:bg-gray-100 rounded">
//               <FaCog className="mr-3" /> Settings
//             </button>
//             <div className="flex items-center justify-between w-full p-3 hover:bg-gray-100 rounded">
//               <div className="flex items-center">
//                 <FaBell className="mr-3" /> Notifications
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input type="checkbox" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} className="sr-only peer" />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
//               </label>
//             </div>
//             <button className="flex items-center w-full p-3 text-red-500 hover:bg-gray-100 rounded">
//               <FaSignOutAlt className="mr-3" /> Log Out
//             </button>
//           </div>
//         </div>

//         <div className="w-full md:w-[60%] bg-white p-6 shadow-lg rounded-r-lg relative flex flex-col items-center min-h-[70vh]">
//           {activeSection ? (
//             <button onClick={() => setActiveSection(null)} className="absolute top-4 right-4 text-red-500">
//               <FaTimes size={20} />
//             </button>
//           ) : null}
//           {activeSection === "profile" && (
//             <div className="p-6 w-full">
//               <div className="flex flex-col items-center mb-6">
//                 <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mb-2">
//                   <img src={humanIcon} alt="Profile" className="w-full h-full object-cover" />
//                 </div>
//               </div>
//               <div className="space-y-4 text-sm">
//                 {Object.entries(profile).map(([key, value]) => (
//                   <div key={key} className="flex justify-between border-b pb-2 text-center sm:text-left flex-col sm:flex-row">
//                     <span className="text-gray-600 capitalize">{key}</span>
//                     {isEditing ? (
//                       <input type="text" name={key} value={value} onChange={handleChange} className="border px-2 py-1 rounded w-full sm:w-auto" />
//                     ) : (
//                       <span className="font-medium">{value}</span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//               <button onClick={() => setIsEditing(!isEditing)} className="mt-6 px-4 py-2 bg-[#1E3A8A] text-white rounded w-full sm:w-auto hover:bg-[#162E6A] transition">
//                 {isEditing ? "Save Changes" : "Edit Profile"}
//               </button>
//             </div>
//           )}
//           {activeSection === "settings" && (
//             <div className="p-6 w-full">
//               <h2 className="text-xl font-semibold mb-4">Settings</h2>
//               <div className="space-y-4">
//                 <div className="flex justify-between border-b pb-2">
//                   <span className="text-gray-600">Theme</span>
//                   <span className="font-medium">Light</span>
//                 </div>
//                 <div className="flex justify-between border-b pb-2">
//                   <span className="text-gray-600">Language</span>
//                   <span className="font-medium">Eng</span>
//                 </div>
//               </div>
//             </div>
//           )}
//           {!activeSection && (
//             <div className="flex justify-center items-center w-full">
//               <img src={profiledash} alt="Dashboard Placeholder" className="max-w-full h-auto md:max-h-[300px]" />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;







import React, { useState, useEffect } from "react";
import { FaUser, FaCog, FaBell, FaSignOutAlt, FaTimes } from "react-icons/fa";
import humanIcon from "../assets/profile.png";
import profiledash from "../assets/profileDash.png";

const ProfileDashboard = () => {
  const userId = localStorage.getItem("userId");
  const localName = localStorage.getItem("fullName");
  const localEmail = localStorage.getItem("email");

  console.log(userId);

  const [activeSection, setActiveSection] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  // API Call: Fetch Profile by ID
  const fetchProfile = async () => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    try {
      const response = await fetch(`http://localhost:8000/api/v1/user/profile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include token in the header
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      console.log(data);
      setProfile({
        name: data.fullName,
        email: data.email,
        mobile: data.mobileNumber,
        location: data.location,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // API Call: Update Profile by ID
  const updateProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/user/update-profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include authorization token if required
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profile),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
  
      alert("Profile updated successfully!");
      setIsEditing(false);
      fetchProfile(); // Refresh data after update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };


  // Logout the user
  const logoutUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/user/logout", {
        method: "POST",
        credentials: "include", // Important for sending cookies
      });
  
      if (!response.ok) {
        throw new Error("Logout failed");
      }
  
      alert("Logout successful!");
      window.location.href = "/signin"; 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  
  

  return (
    <div className="flex justify-center items-center min-h-screen relative p-4">
      <button onClick={() => window.location.href = "/"} className="absolute top-4 left-4 text-gray-600">
        <FaTimes size={24} />
      </button>
      <div className="w-full max-w-3xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Sidebar */}
        <div className="w-full md:w-[40%] bg-white p-6 shadow-lg rounded-l-lg">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 overflow-hidden">
              <img src={humanIcon} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-lg font-semibold">{profile.name || localName}</h2>
            <p className="text-gray-500">{profile.email || localEmail}</p>
          </div>
          <div className="mt-6 space-y-3 w-full">
            <button onClick={() => setActiveSection("profile")} className="flex items-center w-full p-3 hover:bg-gray-100 rounded">
              <FaUser className="mr-3" /> My Profile
            </button>
            <button onClick={() => setActiveSection("settings")} className="flex items-center w-full p-3 hover:bg-gray-100 rounded">
              <FaCog className="mr-3" /> Settings
            </button>
            <div className="flex items-center justify-between w-full p-3 hover:bg-gray-100 rounded">
              <div className="flex items-center">
                <FaBell className="mr-3" /> Notifications
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>
            <button onClick={logoutUser} className="flex items-center w-full p-3 text-red-500 hover:bg-gray-100 rounded">
              <FaSignOutAlt className="mr-3" /> Log Out
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-[60%] bg-white p-6 shadow-lg rounded-r-lg relative flex flex-col items-center min-h-[70vh]">
          {activeSection ? (
            <button onClick={() => setActiveSection(null)} className="absolute top-4 right-4 text-red-500">
              <FaTimes size={20} />
            </button>
          ) : null}

          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="p-6 w-full">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mb-2">
                  <img src={humanIcon} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 text-sm">
                {Object.entries(profile).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2 text-center sm:text-left flex-col sm:flex-row">
                    <span className="text-gray-600 capitalize">{key}</span>
                    {isEditing ? (
                      <input type="text" name={key} value={value} onChange={handleChange} className="border px-2 py-1 rounded w-full sm:w-auto" />
                    ) : (
                      <span className="font-medium">{value}</span>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={isEditing ? updateProfile : () => setIsEditing(true)}
                className="mt-6 px-4 py-2 bg-[#1E3A8A] text-white rounded w-full sm:w-auto hover:bg-[#162E6A] transition"
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <div className="p-6 w-full">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Theme</span>
                  <span className="font-medium">Light</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium">Eng</span>
                </div>
              </div>
            </div>
          )}

          {/* Default Dashboard Image */}
          {!activeSection && (
            <div className="flex justify-center items-center w-full">
              <img src={profiledash} alt="Dashboard Placeholder" className="max-w-full h-auto md:max-h-[300px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
