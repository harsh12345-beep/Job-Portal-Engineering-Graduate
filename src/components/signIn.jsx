import { useState } from "react";
import Einfralogo from "../assets/Einfratech.png"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-md p-2 flex justify-between items-center w-full relative">
      <a href="#">
        <img src={Einfralogo} alt="Company Logo" className="h-10" />
      </a>
      <button className="md:hidden text-3xl" onClick={toggleMenu}>
        {menuOpen ? "✖" : "☰"}
      </button>
      <div
        className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center md:space-x-6 absolute md:static top-16 left-0 w-full bg-white md:w-auto p-4 md:p-0 shadow-md md:shadow-none text-center z-50 text-lg md:text-base`}
      >
        <Link to="/" className="block py-2 text-gray-700 hover:text-blue-900 transition-all text-xl md:text-lg" onClick={toggleMenu}><b>Home</b></Link>
        <Link to="/jobs" className="block py-2 text-gray-700 hover:text-blue-900 transition-all text-xl md:text-lg" onClick={toggleMenu}><b>Jobs</b></Link>
        <Link to="/signin" className="block py-2 text-gray-700 hover:text-blue-900 transition-all text-xl md:text-lg" onClick={toggleMenu}><b>Employers</b></Link>
        <Link to="/signup" className="block py-2 border border-blue-900 px-6 rounded text-blue-900 hover:bg-blue-900 hover:text-white transition-all text-lg md:text-base" onClick={toggleMenu}>Sign Up</Link>
      </div>
    </nav>
  );
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await fetch("http://localhost:8000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }
      console.log("Full Response:", data);
  
      const userId = data.user.id || data.user._id; 
      const isVerified = data.user.isVerified; 

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("fullName", data.user.fullName);
      localStorage.setItem("email", data.user.email);
  
      console.log("Token stored:", localStorage.getItem("token"));
      console.log("User ID stored:", localStorage.getItem("userId"));
      console.log("User Role stored:", localStorage.getItem("userRole"));
      console.log("User fullName stored:", localStorage.getItem("fullName"));
      console.log("User email stored:", localStorage.getItem("email"));
  
      switch (data.user.role) {
        case "Admin":
            if (isVerified) {
                navigate("/admindashboard");
            } else {
                alert("Oops! You are not verified yet. Please try again after some time");
            }
            break;
        case "Student":
            navigate("/candidatedash");
            break;
        case "Employer":
            if (isVerified) {
                navigate("/employeedash");
            } else {
                alert("Oops! You are not verified yet. Please try again after some time");
            }
            break;
        default:
            navigate("/");
    }
    
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow justify-center items-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
            SIGN IN
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email ID
              </label>
              <input
                type="email"
                placeholder="Enter email id"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full p-3 pr-10 border rounded focus:ring-2 focus:ring-blue-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white p-3 rounded hover:bg-blue-600"
            >
              Login
            </button>

            <p className="text-lg md:text-sm text-center mt-4">
              Do not have an account? <Link to="/signup" className="text-blue-600 font-medium hover:underline">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
