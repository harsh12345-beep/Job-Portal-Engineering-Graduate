import { useState } from 'react';
import Human from './human.png';
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import EinfratechLogo from "../admindash/Einfratech.png"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center py-4 px-6 border-b border-gray-300 mb-6">
        {/* Logo */}
        <img className="w-22 h-14" src={EinfratechLogo} alt="Logo" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-semibold">
          <Link to='/postedjobs' className="hover:text-blue-500 transition-all font-bold px-4 py-2">Posted Jobs</Link>
          <Link to="/paidfeatures" className="hover:text-blue-500 transition-all px-4 py-2">Paid Features</Link>
          <a href="#" className="hover:text-blue-500 transition-all px-4 py-2">Certification</a>
          <Link to="/profiledashboard" className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center p-1">
            <img src={Human} className="w-10 h-10 rounded-full" alt="Profile" />
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700 text-2xl p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col space-y-4 text-gray-700 font-semibold p-6 bg-gray-100 rounded-lg shadow-md mx-4">
          <Link to='/postedjobs' className="hover:text-blue-500 transition-all px-4 py-2">Posted Jobs</Link>
          <Link to="/paidfeatures" className="hover:text-blue-500 transition-all px-4 py-2">Paid Features</Link>
          <a href="#" className="hover:text-blue-500 transition-all px-4 py-2">Certification</a>
          {/* Profile Link in Mobile Menu */}
          <Link to="/profiledashboard" className="flex items-center space-x-3 bg-gray-300 p-3 rounded-lg hover:bg-gray-400 transition">
            <img src={Human} className="w-10 h-10 rounded-full" alt="Profile" />
            <span className="font-bold text-gray-800">My Profile</span>
          </Link>
        </nav>
      )}
    </>
  );
};

export default Navbar;
