# Job Portal for Technical Graduates

## 📖 Overview

The *Job Portal for Technical Graduates* is a web-based platform designed to connect *technical graduates* with employers for *jobs, internships, and industrial visits. Employers can post job listings, while candidates can apply for opportunities and manage their resumes. The platform also includes **admin controls for managing job postings, pricing, and user data*.

## 🚀 Key Features

- *User Authentication & Management*: Sign-up/Login using email or phone OTP authentication.
- *Employer Dashboard*:
    - Post job listings and internships.
    - Free posting for the first *5 job posts, then **paid*.
    - Paid access to *candidate resumes and contact details*.
- *Candidate Dashboard*:
    - Apply for *jobs, internships, and industrial visits*.
    - Upload and manage *resumes*.
- *Admin Dashboard*:
    - Manage candidates, employers, and job postings.
    - Approve or remove *job listings, internships, and industrial visits*.
    - Set *pricing and discounts* for paid features.
    - Add *promotional posters* and *upload job certifications*.
- *Job Posting & Application System*: Employers can post job listings, internships, and industrial visits, while candidates can apply.
- *Admin Controls & Pricing Management*: Modify pricing, remove/add data from users.

## 🛠 Tech Stack

### Frontend

- React.js
- TailwindCSS

### Backend

- Node.js
- Express
- MongoDB

### Security

- JWT Authentication
- Secure Cookies for session management

## 🎯 Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (Latest Stable Version)
- MongoDB (Running Instance)

### Setup Instructions

### Frontend

```c
cd Job-Portal
npm install
npm run dev
```

### Backend

```c
cd Backend
npm install
```

To run the backend server:

```c

node server.js
```

### Environment Variables

Create a .env file in the root directory and add:
env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key

## ⚙ API Endpoints (Example)

| Method | Endpoint | Description |
| --- | --- | --- |
| *POST* | /api/auth/register | Register a new user |
| *POST* | /api/auth/logout | Logout user |
| *GET* | /api/jobs | Fetch all job listings |
| *POST* | /api/jobs | Post a new job (Employer only) |
| *POST* | /api/jobs/apply | Apply for a job (Candidate) |