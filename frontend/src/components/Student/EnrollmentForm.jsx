import React, { useState } from "react";

const EnrollmentForm = () => {
  const [selectedType, setSelectedType] = useState("new student"); // State for selected student type

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value); // Update the state based on the selected option
  };

  return (
    <div className="enrollment-form">
      <h1>Enrollment Form</h1>
      <p>
        Please select your student type and fill out the required fields
        carefully.
      </p>

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
        </select>
      </div>

      <section className="form-section">
        {selectedType === "new student" && (
          <form>
            <h2>New Student Enrollment</h2>
            <div className="form-grid">
              <div className="form-left">
                <label htmlFor="full-name">Full Name</label>
                <input
                  type="text"
                  id="full-name"
                  placeholder="Enter your full name"
                />
                <label htmlFor="dob">Date of Birth</label>
                <input type="date" id="dob" />
                <label htmlFor="contact-number">Contact Number</label>
                <input
                  type="number"
                  id="contact-number"
                  placeholder="Enter your contact number"
                />
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                />
                <label htmlFor="address">Home Address</label>
                <textarea
                  id="address"
                  rows="2"
                  placeholder="Enter your home address"
                ></textarea>
              </div>
              <div className="form-right">
                <h2>Upload Required Documents</h2>
                <div className="upload-documents">
                  <button type="button">
                    Birth Certificate (PSA/NSO Certified)
                  </button>
                  <button type="button">Certificate of Grades</button>
                  <button type="button">
                    Certificate of Good Moral Character
                  </button>
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
          <form>
            <h2>Old Student Re-enrollment</h2>
            <div className="form-grid">
              <div className="form-left">
                <label htmlFor="full-name">Student ID</label>
                <input
                  type="text"
                  id="student_id"
                  placeholder="Enter Student ID"
                />
                <label htmlFor="dob">Full Name</label>
                <input type="text" id="full_name" placeholder="Full Name" />
                <label htmlFor="contact-number">Program/Department</label>
                <input
                  type="text"
                  id="progam"
                  placeholder="Program/Department"
                />
                <label htmlFor="email">Academic Term & Year Level</label>
                <input
                  type="text"
                  id="academic_year"
                  placeholder="Academic Year"
                />
                <label htmlFor="address">Contact Information</label>
                <input type="number" id="contact" placeholder="Contact" />
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
          <form>
            <h2>Irregular Student Enrollment</h2>
            <div className="form-grid">
              <div className="form-left">
                <label htmlFor="full-name">Student ID</label>
                <input
                  type="text"
                  id="student_id"
                  placeholder="Enter your Student ID"
                />
                <label htmlFor="dob">Full Name</label>
                <input type="text" id="fullname" />
                <label htmlFor="contact-number">Program/Department</label>
                <input
                  type="text"
                  id="program"
                  placeholder="Enter Program/Department"
                />
                <label htmlFor="email">Contact Number</label>
                <input
                  type="number"
                  id="contact-number"
                  placeholder="Enter Contact Number"
                />
                <label htmlFor="address">Email Address</label>
                <input
                  type="email"
                  id="email"
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
          <form>
            <h2>Transferee Student Enrollment</h2>
            <div className="form-grid">
              <div className="form-left">
                <label htmlFor="full-name">Full Name</label>
                <input
                  type="text"
                  id="full-name"
                  placeholder="Enter your full name"
                />
                <label htmlFor="dob">Date of Birth</label>
                <input type="date" id="dob" />
                <label htmlFor="contact-number">Contact Number</label>
                <input
                  type="number"
                  id="contact-number"
                  placeholder="Enter your contact number"
                />
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                />
                <label htmlFor="address">Home Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter your home address"
                />
                <label htmlFor="prev-school">Previous Shool Name</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter your home address"
                />
                <label htmlFor="address">Previous Program</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter your home address"
                />
                <label type="text" htmlFor="address">
                  Previous Program/Department
                </label>
                <input id="address" placeholder="Enter your home address" />
              </div>
              <div className="form-right">
                <h2>Upload Required Documents</h2>
                <div className="upload-documents">
                  <button type="button">
                    Birth Certificate (PSA/NSO Certified)
                  </button>
                  <button type="button">Certificate of Grades</button>
                  <button type="button">
                    Certificate of Good Moral Character
                  </button>
                  <button type="button">Medical Certificate</button>
                  <button type="button">Transcript of Records</button>
                  <button type="button">2x2 ID Picture</button>
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
      </section>
    </div>
  );
};

export default EnrollmentForm;
