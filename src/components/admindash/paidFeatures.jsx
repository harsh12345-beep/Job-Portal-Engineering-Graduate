import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaEdit, FaPlus, FaTimes } from "react-icons/fa";
import { FaUserTie, FaMoneyBillWave, FaExclamationCircle } from "react-icons/fa";
import myImage from './Einfratech.png';
import { FaSackDollar } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { BiSolidGroup } from "react-icons/bi";
import { GiSandsOfTime } from "react-icons/gi";
import axios from "axios";  // Import axios

const PaidFeatures = () => {
    const [plans, setPlans] = useState([
        { name: "Basic Plan", price: 199.99, features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"], status: "Enabled" },
        { name: "Free Plan", price: 0.0, features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"], status: "Enabled" },
        { name: "Advance Plan", price: 199.99, features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"], status: "Disabled" },
    ]);


    const fetchPlans = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/subscription/get-all");
            console.log("API Response: ", response.data);

            if (response.data && Array.isArray(response.data.data)) {
                setPlans(response.data.data); 
            } else {
                console.error("Invalid data format from API");
            }
        } catch (error) {
            console.error("Error fetching plans:", error);
        }
    };

     // Call fetchPlans when the component loads
     useEffect(() => {
        fetchPlans();
    }, []);


    const [showModal, setShowModal] = useState(false);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
    const [tempName, setTempName] = useState("");
    const [tempPrice, setTempPrice] = useState(0);
    const [tempFeatures, setTempFeatures] = useState([]);
    const [tempStatus, setTempStatus] = useState("Enabled");
    const [newFeature, setNewFeature] = useState("");

    // Open Edit Modal for Existing Plans
    const handleEditClick = (index) => {
        setIsCreatingNew(false);
        setSelectedPlanIndex(index);
        setTempName(plans[index].name);
        setTempPrice(plans[index].price);
        setTempFeatures([...plans[index].features]);
        setTempStatus(plans[index].status);
        setShowModal(true);
    };

    // Open Create New Plan Modal
    const handleCreateNewPlan = () => {
        setIsCreatingNew(true);
        setTempName("");
        setTempPrice(0);
        setTempFeatures([]);
        setTempStatus("Enabled");
        setShowModal(true);
    };

    // Save Changes (Edit Existing or Create New)
    const handleSaveChanges = () => {
        if (isCreatingNew) {
            setPlans([...plans, { name: tempName, price: tempPrice, features: [...tempFeatures], status: tempStatus }]);
        } else {
            const updatedPlans = [...plans];
            updatedPlans[selectedPlanIndex] = { name: tempName, price: tempPrice, features: [...tempFeatures], status: tempStatus };
            setPlans(updatedPlans);
        }
        setShowModal(false);
    };

    // Enable/Disable Toggle
    const handleToggleStatus = (index) => {
        const updatedPlans = [...plans];
        updatedPlans[index].status = updatedPlans[index].status === "Enabled" ? "Disabled" : "Enabled";
        setPlans(updatedPlans);
    };

    // Remove Feature
    const handleRemoveFeature = (index) => {
        const updatedFeatures = [...tempFeatures];
        updatedFeatures.splice(index, 1);
        setTempFeatures(updatedFeatures);
    };

    // Add Feature (Plus Button Click)
    const handleAddFeature = () => {
        if (newFeature.trim() !== "") {
            setTempFeatures([...tempFeatures, newFeature]);
            setNewFeature("");
        }
    };

    // Handle Enter Key to Add Feature
    const handleEnterKey = (e) => {
        if (e.key === "Enter") {
            handleAddFeature();
        }
    };

    return (
        <div className=" container-fluid min-vh-100" style={{ fontFamily: "Roboto, sans-serif" }}>
<nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
  <div className="container d-flex justify-content-between">
    <a className="navbar-brand fw-bold" style={{ fontFamily: "Poppins, sans-serif" }} href="#">
        <img src={myImage} alt="LOGO" style={{ width:80, height:50 }} />
    </a>
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
    <div className="collapse.show navbar-collapse justify-content-between" id="navbarNav">
      <ul className="navbar-nav ms-auto me-3" style={{ fontFamily: "Poppins, sans-serif" }}>
              <li className="nav-item me-5"><Link to="/postedjobs" className="nav-link" href="#">Posted Jobs</Link></li>
              <li className="nav-item me-5 fw-bold"><a className="nav-link" href="#">Paid Features</a></li>
              <li className="nav-item me-5"><a className="nav-link" href="#">Certifications</a></li>
            </ul>
      <div className="d-flex align-items-center">
        <Link to="/profiledashboard" className="border-0 bg-transparent p-0">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
            alt="Profile" 
            className="rounded-circle" 
            width="50" 
            height="50" 
          />
        </Link>
      </div>
    </div>
  </div>
</nav>

<div className="container mt-4">
  {/* Stats Section */}
  <div className="row text-center">
    <div className="col-md-3">
      <div className="p-3 border rounded bg-white shadow-sm d-flex flex-column align-items-center">
        <FaMoneyBillWave size={40} className="text-warning mb-3" />
        <div className="d-flex justify-content-center align-items-center gap-2">
          <FaSackDollar className="text-warning" />
          <h5 style={{ fontFamily: "Poppins, sans-serif" }}>80,0000.125</h5>
        </div>
        <p className="mt-2">Total Revenue</p>
      </div>
    </div>
    <div className="col-md-3">
      <div className="p-3 border rounded bg-white shadow-sm d-flex flex-column align-items-center">
        <FaCircleUser size={40} className="mb-3" />
        <div className="d-flex justify-content-center align-items-center gap-2">
          <BiSolidGroup />
          <h5 style={{ fontFamily: "Poppins, sans-serif" }}>15999</h5>
        </div>
        <p className="mt-2">Premium Users</p>
      </div>
    </div>
    <div className="col-md-3">
      <div className="p-3 border rounded bg-white shadow-sm d-flex flex-column align-items-center">
        <FaUserTie size={40} className="mb-3" />
        <div className="d-flex justify-content-center align-items-center gap-2">
          <BiSolidGroup />
          <h5 style={{ fontFamily: "Poppins, sans-serif" }}>12999</h5>
        </div>
        <p className="mt-2">Premium Employers</p>
      </div>
    </div>
    <div className="col-md-3">
      <div className="p-3 border rounded bg-white shadow-sm d-flex flex-column align-items-center">
        <FaExclamationCircle size={40} className="text-danger mb-3" />
        <div className="d-flex justify-content-center align-items-center gap-2">
          <GiSandsOfTime />
          <h5>80,0000.125</h5>
        </div>
        <p className="mt-2">Pending Refunds</p>
      </div>
    </div>
  </div>
</div>


            
        <div className="container mt-4">
            <h4 className="text-start pb-5" style={{ fontFamily: "Poppins, sans-serif" }}>Our Subscription Plans</h4>
            <div className="row justify-content-center">
                {plans.map((plan, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <h5 className="fw-bold text-center pb-2">{plan.name}</h5>
                        <div className="card shadow-sm p-3 border rounded" style={{ borderColor: "#ddd" }}>
                            
                            <p className="text-danger fw-bold">
                            <FaSackDollar className="text-warning" /> {plan.price} / Month
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                            <p className="text-warning mb-1">Price</p>
                                {plan.name !== "Free Plan" && (
                                    <button className="btn btn-sm text-white" style={{ backgroundColor: "#1E3A8A" }} onClick={() => handleEditClick(index)}>
                                        Edit <FaEdit />
                                    </button>
                                )}
                            </div>
                            <ul className="list-unstyled" style={{color:"#FF5733"}}>
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="mb-1">• {feature}</li>
                                ))}
                            </ul>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="border-0 bg-transparent fw-bold"
                                    style={{ color: plan.status === "Enabled" ? "green" : "red", cursor: "pointer" }}
                                    onClick={() => handleToggleStatus(index)}
                                >
                                    {plan.status}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-3 pb-3">
                <Link to="/create-subscription" className="btn px-4 text-white"style={{ backgroundColor: "#1E3A8A" }}>
                    Create New Plan
                </Link>
            </div>

            {/* Modal for Editing & Creating Plans */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isCreatingNew ? "Create New Plan" : `Edit ${tempName}`}</h5>
                                
                            </div>
                            <div className="modal-body">
                                <label className="form-label">Plan Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                />

                                <label className="form-label mt-3">Price:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={tempPrice}
                                    onChange={(e) => setTempPrice(parseFloat(e.target.value))}
                                />

                                <label className="form-label mt-3">Features:</label>
                                {tempFeatures.map((feature, i) => (
                                    <div key={i} className="d-flex align-items-center mb-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={feature}
                                            onChange={(e) => {
                                                const updatedFeatures = [...tempFeatures];
                                                updatedFeatures[i] = e.target.value;
                                                setTempFeatures(updatedFeatures);
                                            }}
                                        />
                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleRemoveFeature(i)}>
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))}
                                <div className="d-flex align-items-center mt-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Add new feature"
                                        value={newFeature}
                                        onChange={(e) => setNewFeature(e.target.value)}
                                        onKeyDown={handleEnterKey}
                                    />
                                    <button className="btn btn-success btn-sm ms-2" onClick={handleAddFeature}>
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                                    Save Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default PaidFeatures;