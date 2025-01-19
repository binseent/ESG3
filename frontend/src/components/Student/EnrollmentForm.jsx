//EnrollmentForm.jsx
import React, { useState } from "react";
import axios from "axios"; 
import Check from "../../assets/confirm-icon.png";

const EnrollmentForm = () => {
  const [selectedType, setSelectedType] = useState("new student");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    contactNumber: "",
    email: "",
    address: "",
    prevSchoolName: "",
    prevProgram: "",
    studentId: "",
    academicYear: "",
    program: "",
  });

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api/enroll', {
        studentType: selectedType,
        ...formData,
      });
      
      // If enrollment is successful, show the popup
      if (response.status === 200) {
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error submitting enrollment form:", error);
      alert("Failed to submit enrollment form. Please try again.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="enrollment-form">
      <h1>Enrollment Form</h1>
      <p>Please select your student type and fill out the required fields carefully.</p>

      <div className="form-header">
        <select
          id="student-type"
          className="dropdown"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="new student">New Student</option>
          <option value="old student">Old Student</option>
          <option value="irregular">Irregular</option>
          <option value="transferee">Transferee</option>
          <option value="shiftee">Shiftee</option>
        </select>
      </div>

      <div className="form-left">
  {selectedType !== "new student" && (
    <>
      <label htmlFor="studentId">Student ID</label>
      <input
        type="text"
        id="studentId"
        value={formData.studentId}
        onChange={handleChange}
        placeholder="Enter your Student ID"
      />
    </>
  )}
  <label htmlFor="academicYear">Academic Year</label>
  <input
    type="text"
    id="academicYear"
    value={formData.academicYear}
    onChange={handleChange}
    placeholder="e.g., 2025-2026"
  />
  {selectedType !== "new student" && (
    <>
      <label htmlFor="program">Program</label>
      <input
        type="text"
        id="program"
        value={formData.program}
        onChange={handleChange}
        placeholder="Enter your current program"
      />
      <label htmlFor="yearLevel">Year Level</label>
      <select
        id="yearLevel"
        value={formData.yearLevel || ""}
        onChange={handleChange}
      >
        <option value="" disabled>Select your year level</option>
        <option value="1st Year">1st Year</option>
        <option value="2nd Year">2nd Year</option>
        <option value="3rd Year">3rd Year</option>
        <option value="4th Year">4th Year</option>
      </select>
    </>
  )}
  {selectedType === "new student" && (
    <>
      <label htmlFor="prevSchoolName">Previous School Name</label>
      <input
        type="text"
        id="prevSchoolName"
        value={formData.prevSchoolName}
        onChange={handleChange}
        placeholder="Enter your previous school name"
      />
      <label htmlFor="prevProgram">Previous Program (if applicable)</label>
      <input
        type="text"
        id="prevProgram"
        value={formData.prevProgram}
        onChange={handleChange}
        placeholder="Enter your previous program"
      />
    </>
  )}
</div>


      <section className="form-section">
        {selectedType === "new student" && (
          <form onSubmit={handleSubmit}>
            <h2>New Student Enrollment</h2>
            <div className="form-grid">
              <div className="form-left">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="number"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                />
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
                <label htmlFor="address">Home Address</label>
                <textarea
                  id="address"
                  rows="2"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your home address"
                ></textarea>
              </div>
              
              <div className="form-right">
                <h2>Upload Required Documents</h2>
                <div className="upload-documents">
                  <button type="button">Birth Certificate (PSA/NSO Certified)</button>
                  <button type="button">Certificate of Grades</button>
                  <button type="button">Certificate of Good Moral Character</button>
                  <button type="button">Medical Certificate</button>
                  <button type="button">Transcript of Records</button>
                </div>
              </div>
            </div>
            <div className="form-footer">
              <button type="submit" className="submit-button">
                Confirm Enrollment
              </button>
            </div>
          </form>
        )}

        {selectedType === "old student" && (
          <form onSubmit={handleSubmit}>
            <h2>Old Student Re-enrollment</h2>
            <div className="form-grid">
              <div className="form-left">
                <label htmlFor="studentId">Student ID</label>
                <input
                  type="text"
                  id="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Enter Student ID"
                />
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                />
                <label htmlFor="program">Program/Department</label>
                <input
                  type="text"
                  id="program"
                  value={formData.program}
                  onChange={handleChange}
                  placeholder="Enter Program/Department"
                />
                <label htmlFor="academicYear">Academic Term & Year Level</label>
                <input
                  type="text"
                  id="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  placeholder="Enter Academic Year"
                />
                <label htmlFor="contactNumber">Contact Information</label>
                <input
                  type="number"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter Contact Number"
                />
              </div>

              <div className="form-right">
                <h2>Upload Required Documents</h2>
                <div className="upload-documents">
                  <button type="button">Certificate of Grades</button>
                  <button type="button">Course Checklist</button>
                  <button type="button">Society Fee Receipt</button>
                </div>
              </div>
            </div>
            <div className="form-footer">
              <button type="submit" className="submit-button">
                Confirm Enrollment
              </button>
            </div>
          </form>
        )}

        {selectedType === "irregular" && (
          <form onSubmit={handleSubmit}>
            <h2>Irregular Student Enrollment</h2>
            <div className="form-grid">
              <div className="form-left">
                <label htmlFor="studentId">Student ID</label>
                <input
                  type="text"
                  id="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Enter your Student ID"
                />
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                <label htmlFor="program">Program/Department</label>
                <input
                  type="text"
                  id="program"
                  value={formData.program}
                  onChange={handleChange}
                  placeholder="Enter Program/Department"
                />
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="number"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter Contact Number"
                />
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                />
              </div>
              <div className="form-right">
                <h2>Upload Required Documents</h2>
                <div className="upload-documents">
                  <button type="button">Certificate of Grades</button>
                  <button type="button">Pre-Enrollment Form</button>
                  <button type="button">Course Checklist</button>
                  <button type="button">Society Fee Receipt</button>
                </div>
              </div>
            </div>
            <div className="form-footer">
              <button type="submit" className="submit-button">
                Confirm Enrollment
              </button>
            </div>
          </form>
        )}

        {selectedType === "transferee" && (
          <form onSubmit={handleSubmit}>
            <h2>Transferee Student Enrollment</h2>
            <div className="form-grid">
              <div className="form-left">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="number"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                />
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
                <label htmlFor="address">Home Address</label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your home address"
                />
                <label htmlFor="prevSchoolName">Previous School Name</label>
                <input
                  type="text"
                  id="prevSchoolName"
                  value={formData.prevSchoolName}
                  onChange={handleChange}
                  placeholder="Enter your previous school name"
                />
                <label htmlFor="prevProgram">Previous Program</label>
                <input
                  type="text"
                  id="prevProgram"
                  value={formData.prevProgram}
                  onChange={handleChange}
                  placeholder="Enter your previous program"
                />
              </div>
            </div>
            </form>
        )}
          
          {selectedType === "shiftee" && (
          <form onSubmit={handleSubmit}>
            <h2>Shiftee Student Enrollment</h2>
            <div className="form-grid">
              <div className="form-left">
                <label htmlFor="studentId">Student ID</label>
                <input
                  type="text"
                  id="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Enter your Student ID"
                />
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                <label htmlFor="currentProgram">Current Program/Department</label>
                <input
                  type="text"
                  id="currentProgram"
                  value={formData.currentProgram}
                  onChange={handleChange}
                  placeholder="Enter your current program"
                />
                <label htmlFor="newProgram">New Program/Department</label>
                <input
                  type="text"
                  id="newProgram"
                  value={formData.newProgram}
                  onChange={handleChange}
                  placeholder="Enter your desired program"
                />
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="number"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter Contact Number"
                />
              </div>

              <div className="form-right">
                <h2>Upload Required Documents</h2>
                <div className="upload-documents">
                  <button type="button">Certificate of Grades</button>
                  <button type="button">Program Shift Form</button>
                  <button type="button">Course Checklist</button>
                  <button type="button">Society Fee Receipt</button>
                </div>
              </div>
            </div>
            <div className="form-footer">
              <button type="submit" className="submit-button">
                Confirm Enrollment
              </button>
            </div>
          </form>
        )}
            

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <img src={Check} alt="check.png" />
              <h2>Enrollment Form Submitted</h2>
              <p>To track your enrollment process, go to “Enrollment Details”</p>
              <button onClick={closePopup} className="close-popup">
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default EnrollmentForm;
