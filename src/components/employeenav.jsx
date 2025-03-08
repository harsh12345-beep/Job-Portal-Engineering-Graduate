import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import EinfratechLogo from "../assets/Einfratech.png"; 


const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.1)", 
        padding: "0 20px",
        margin: "0 auto",
        maxWidth: "1294px",
        width: "100%",
      }}
    >
      <div className="container-fluid" style={{ padding: "0" }}>
        {/* Logo */}
        <a className="navbar-brand" href="#">
          <img
            src={EinfratechLogo}
            alt="Einfratech"
            style={{ height: "40px" }} 
          />
        </a>

        {/* Toggle Button for Mobile */}
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

        {/* Collapsible Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <button
                className="btn btn-primary me-3"
                style={{ backgroundColor: "#1E3A8A", border: "none" }}
              >
                Post a Job
              </button>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faBell} size="lg" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faUserCircle} size="2x" style={{ color: "#1E3A8A" }} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;