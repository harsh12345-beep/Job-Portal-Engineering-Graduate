import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons';
import Navbar from './employeenav';

const Dashboard = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const fullName = localStorage.getItem("fullName");
  console.log(fullName);

  return (
    <div>
      <Navbar />
      <div className="container mt-5" style={{ marginTop: '100px' }}>
        <h2 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>Hello, Owner Name : ${fullName}</h2>
        <p>Here is your daily activity and applications.</p>

        {/* Cards for Open Jobs and Saved Candidates */}
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <div style={{ width: '100%', height: '94px', backgroundColor: '#C9C9EC', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.1)' }}>
              <div>
                <h5 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>600</h5>
                <p style={{ margin: 0, fontSize: '14px' }}>Open Jobs</p>
              </div>
              <FontAwesomeIcon icon={faBriefcase} size="2x" />
            </div>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <div style={{ width: '100%', height: '94px', backgroundColor: '#FFF6E6', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.1)' }}>
              <div>
                <h5 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>550</h5>
                <p style={{ margin: 0, fontSize: '14px' }}>Saved Candidates</p>
              </div>
              <FontAwesomeIcon icon={faBriefcase} size="2x" />
            </div>
          </div>
        </div>

        {/* Recently Posted Job Section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Recently Posted Job</h3>
          <span style={{ fontSize: '16px', fontWeight: 700 }}>View All</span>
        </div>

        {/* Table Layout for Job Entries */}
        <div className="table-responsive">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', backgroundColor: '#D9D9D9', padding: '10px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>
            <div>JOBS</div>
            <div>STATUS</div>
            <div>APPLICATION</div>
            <div>ACTIONS</div>
          </div>
          <br />
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                alignItems: 'center',
                padding: '20px',
                borderBottom: '1px solid #ddd',
                backgroundColor: '#fff',
                boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
                marginBottom: '8px',
                borderRadius: '8px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <strong>UI / UX Designer</strong>
                <br />
                Full Time
              </div>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '85px',
                    height: '31px',
                    backgroundColor: '#5BBF71',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    margin: 'auto',
                  }}
                >
                  Active
                </div>
              </div>
              <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <FontAwesomeIcon icon={faUser} />
                789 Applications
              </div>
              <div style={{ textAlign: 'center' }}>
                <button
                  className="btn"
                  style={{
                    backgroundColor: clickedIndex === index ? '#1E3A8A' : 'white',
                    color: clickedIndex === index ? 'white' : '#1E3A8A',
                    border: '1px solid black',
                    padding: '8px 12px',
                    fontWeight: 'bold',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => setClickedIndex(index)}
                >
                  View Application
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;