//EnrollmentForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Check from "../../assets/confirm-icon.png";

const EnrollmentForm = () => {
  const [selectedType, setSelectedType] = useState("new student");
  const [showPopup, setShowPopup] = useState(false);
  const [studentStatus, setStudentStatus] = useState("");
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

  //get student email
  const fetchStudentData = async () => {
    try {
      const loggedInStudent = JSON.parse(
        localStorage.getItem("loggedInStudent")
      );
      const response = await axios.post(
        "https://esg-3.vercel.app/api/enroll-form",
        {
          email: loggedInStudent.email,
        }
      );
      console.log("Response Data:", response.data);
      setStudentStatus(response.data.status);
      setFormData((prevData) => ({
        ...prevData,
        ...response.data,
      }));
    } catch (error) {
      console.error("Error fetching student data:", error);
      alert("Failed to load student information. Please try again.");
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://esg-3.vercel.app/api/enroll", {
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the file upload logic here
    console.log(file);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const statusMap = {
      Irregular: "irregular",
      New: "new student",
      Old: "old student",
      Shiftee: "shiftee",
      Transferee: "transferee",
    };

    setSelectedType(statusMap[studentStatus] || "new student"); // Default to "new student" if status is not found
  }, [studentStatus]);

  return (
    <div className="enrollment-form">
      <h1>Enrollment Form</h1>

      <p>
        Student Status:
        <span value={selectedType}>{studentStatus}</span>
      </p>

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
              <option value="" disabled>
                Select your year level
              </option>
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
            <label htmlFor="prevProgram">
              Previous Program (if applicable)
            </label>
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
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("birthCertificate").click()
                    }
                  >
                    Birth Certificate (PSA/NSO Certified)
                  </button>
                  <input
                    type="file"
                    id="birthCertificate"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("certificateOfGrades").click()
                    }
                  >
                    Certificate of Grades
                  </button>
                  <input
                    type="file"
                    id="certificateOfGrades"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("goodMoralCharacter").click()
                    }
                  >
                    Certificate of Good Moral Character
                  </button>
                  <input
                    type="file"
                    id="goodMoralCharacter"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("medicalCertificate").click()
                    }
                  >
                    Medical Certificate
                  </button>
                  <input
                    type="file"
                    id="medicalCertificate"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("transcriptOfRecords").click()
                    }
                  >
                    Transcript of Records
                  </button>
                  <input
                    type="file"
                    id="transcriptOfRecords"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
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
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("certificateOfGrades").click()
                    }
                  >
                    Certificate of Grades
                  </button>
                  <input
                    type="file"
                    id="certificateOfGrades"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("courseChecklist").click()
                    }
                  >
                    Course Checklist
                  </button>
                  <input
                    type="file"
                    id="courseChecklist"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("societyFeeReceipt").click()
                    }
                  >
                    Society Fee Receipt
                  </button>
                  <input
                    type="file"
                    id="societyFeeReceipt"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
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
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("certificateOfGrades").click()
                    }
                  >
                    Certificate of Grades
                  </button>
                  <input
                    type="file"
                    id="certificateOfGrades"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("preEnrollmentForm").click()
                    }
                  >
                    Pre-Enrollment Form
                  </button>
                  <input
                    type="file"
                    id="preEnrollmentForm"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("courseChecklist").click()
                    }
                  >
                    Course Checklist
                  </button>
                  <input
                    type="file"
                    id="courseChecklist"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("societyFeeReceipt").click()
                    }
                  >
                    Society Fee Receipt
                  </button>
                  <input
                    type="file"
                    id="societyFeeReceipt"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
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
          <>
            <label htmlFor="prevCollegeName">
              Previous College/University Name
            </label>
            <input
              type="text"
              id="prevCollegeName"
              value={formData.prevCollegeName}
              onChange={handleChange}
              placeholder="Enter your previous college/university name"
            />
            <label htmlFor="prevProgram">
              Previous Program/Course (if applicable)
            </label>
            <input
              type="text"
              id="prevProgram"
              value={formData.prevProgram}
              onChange={handleChange}
              placeholder="Enter your previous program/course"
            />
          </>
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
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("birthCertificate").click()
                    }
                  >
                    Birth Certificate (PSA/NSO Certified)
                  </button>
                  <input
                    type="file"
                    id="birthCertificate"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("transcriptOfRecords").click()
                    }
                  >
                    Transcript of Records
                  </button>
                  <input
                    type="file"
                    id="transcriptOfRecords"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("goodMoralCharacter").click()
                    }
                  >
                    Certificate of Good Moral Character
                  </button>
                  <input
                    type="file"
                    id="goodMoralCharacter"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("honorableDismissal").click()
                    }
                  >
                    Honorable Dismissal
                  </button>
                  <input
                    type="file"
                    id="honorableDismissal"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("medicalCertificate").click()
                    }
                  >
                    Medical Certificate
                  </button>
                  <input
                    type="file"
                    id="medicalCertificate"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
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
                <label htmlFor="currentProgram">
                  Current Program/Department
                </label>
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
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("certificateOfGrades").click()
                    }
                  >
                    Certificate of Grades
                  </button>
                  <input
                    type="file"
                    id="certificateOfGrades"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("programShiftForm").click()
                    }
                  >
                    Program Shift Form
                  </button>
                  <input
                    type="file"
                    id="programShiftForm"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("courseChecklist").click()
                    }
                  >
                    Course Checklist
                  </button>
                  <input
                    type="file"
                    id="courseChecklist"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("societyFeeReceipt").click()
                    }
                  >
                    Society Fee Receipt
                  </button>
                  <input
                    type="file"
                    id="societyFeeReceipt"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
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
              <p>
                To track your enrollment process, go to “Enrollment Details”
              </p>
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
