import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateSubscription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state || {
    planName: "",
    price: 0,
    duration: "",
    features: [],
    status: "Enabled",
    priceValidOn: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Date Change
  const handleDateChange = (date) => {
    setFormData({ ...formData, priceValidOn: date });
  };

  // Handle Features Add
  const addFeature = () => {
    if (formData.newFeature) {
      setFormData({
        ...formData,
        features: [...formData.features, formData.newFeature],
        newFeature: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    try {
      const response = await fetch("http://localhost:8000/api/v1/subscription/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Subscription Created Successfully!");
        navigate("/paidfeatures"); 
      } else {
        console.error("Error:", result.message);
        alert("Failed to create subscription: " + result.message);
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      alert("An error occurred while creating the subscription.");
    }
  };
  


  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 overflow-auto shadow-lg rounded-lg">
      <div className="container mt-5 p-5"
    style={{
      maxWidth: "800px",
      backgroundColor: "#f8f9fa",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.15)", }}>
        <h2 className="text-3xl font-bold text-center text-blue-800">
          Create Subscription
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Create Your New Subscription Model
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Plan Name */}
          <div>
            <label className="block text-gray-700 font-medium text-left">
              Plan Name
            </label>
            <input
              type="text"
              name="planName"
              value={formData.planName}
              onChange={handleChange}
              placeholder="Enter Plan Name"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>

          {/* Subscription Price & Price Valid On */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium text-left">
                Subscription Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter Amount"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium text-left">
                Price Valid On
              </label>
              <DatePicker
                selected={formData.priceValidOn}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a Date"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-700 font-medium text-left">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 1 Month, 6 Months, 1 Year"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Plan Features & Add Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium text-left">
                Plan Features
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="newFeature"
                  value={formData.newFeature || ""}
                  onChange={handleChange}
                  placeholder="Enter Feature"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="p-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-blue-700 transition"
                >
                  +
                </button>
              </div>

              {/* Display Added Features */}
              <ul className="mt-2">
                {formData.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscription Type */}
            <div>
              <label className="block text-gray-700 font-medium text-left">
                Subscription Type
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
              >
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
          <button
  type="submit"
  className="bg-blue-900 hover:bg-blue-700 text-white font-medium text-lg px-10 py-3 rounded-md transition-all duration-300"
>
  Save Subscription
</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubscription;
