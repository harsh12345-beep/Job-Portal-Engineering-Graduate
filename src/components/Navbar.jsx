import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure Bootstrap JS is imported
import humanIcon from "../assets/human.png"; // Import the human icon
import EinfratechLogo from "../assets/"; // Import the Einfratech logo

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand" href="#">
          <img
            src={EinfratechLogo} // Use Einfratech logo instead of text
            alt="Einfratech Logo"
            style={{ height: "40px" }} // Adjust height as needed
          />
        </a>

        {/* Toggle Button for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <a className="nav-link fw-semibold text-dark" href="#">Approvals</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold text-dark" href="#">Posted Jobs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold text-dark" href="#">Paid Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold text-dark" href="#">Certifications</a>
            </li>
          </ul>
        </div>

        {/* User Icon */}
        <div className="d-flex align-items-center">
          <img
            src={humanIcon}
            alt="User"
            className="rounded-circle ms-3"
            style={{ height: "40px", width: "40px" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;