import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import humanIcon from "../employer/profile.png";
import EinfratechLogo from "../employer/Einfratech.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
  <nav className="container mx-auto flex justify-between items-center px-4 md:px-6 max-w-[1125px] py-2">
    
    {/* Logo Section - Left Side */}
    <a href="#">
      <img src={EinfratechLogo} alt="Einfratech Logo" className="h-8" />
    </a>

    {/* Right Side - Post Job & Profile */}
    <div className="flex items-center gap-8">
      {/* Post Job Button */}
      <Link
        to="/createjobform"
        className="border border-blue-900 text-blue-900 px-4 py-2 rounded-md hover:bg-blue-100 transition"
      >
        Post Job
      </Link>

      {/* Profile Icon */}
      <Link to="/profiledashboard">
        <img
          src={humanIcon}
          alt="User"
          className="rounded-full border border-gray-300"
          style={{ height: "36px", width: "36px" }}
        />
      </Link>
    </div>
  </nav>
</div>

  );
};
export default Navbar;