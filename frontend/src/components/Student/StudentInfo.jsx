import React, { useState, useEffect } from "react";
import Icon from "../../assets/icon.png";
import axios from "axios";

const StudentInfo = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editSection, setEditSection] = useState("");
  const [formData, setFormData] = useState({
    course: "",
    birthday: "",
    address: "",
    email: "",
    phone: "",
  });

  const [studentData, setStudentData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
  });

  const [isFetching, setIsFetching] = useState(false); // Loading state for API call

  const openPopup = (section) => {
    setEditSection(section);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchStudentData = async () => {
    setIsFetching(true); // Start loading
    try {
      const loggedInStudent = JSON.parse(
        localStorage.getItem("loggedInStudent")
      );
      const response = await axios.get(
        `http://localhost:3000/api/student-info-data?email=${loggedInStudent.email}`
      );
      setStudentData(response.data);
      setFormData((prevData) => ({
        ...prevData,
        email: response.data.email, // Sync formData with fetched email
      }));
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setIsFetching(false); // End loading
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  // Function to handle saving changes to the database
  const saveChanges = async () => {
    try {
      setIsFetching(true); // Show loading state

      const response = await axios.put(
        "http://localhost:3000/api/update-student-info",
        formData // Send updated form data
      );

      if (response.status === 200) {
        const updatedData = response.data.updatedData;

        // Update the state
        setStudentData({
          ...studentData,
          ...updatedData,
        });

        // Save updated data to localStorage
        localStorage.setItem("studentData", JSON.stringify(updatedData));

        alert("Changes saved successfully!");
        setIsPopupOpen(false); // Close the popup
      } else {
        alert("Failed to save changes.");
      }
    } catch (error) {
      alert(
        "An error occurred while saving your changes. Check the console for details."
      );
    } finally {
      setIsFetching(false); // Hide loading state
    }
  };

  return (
    <div className="contents">
      <h3>Student info</h3>

      <div className="content">
        <div className="profile">
          <div className="profile-photo">
            <img src={Icon} alt="Profile" />
          </div>
          <div className="profile-details">
            <h4>
              Welcome,{" "}
              {studentData.firstName
                ? `${studentData.firstName} ${studentData.middleName} ${studentData.lastName}`
                : "No data available"}
            </h4>
            <p>{studentData.email || "N/A"}</p>

            <button>Change photo</button>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="head">
          <h4>Student info</h4>
          <button
            className="edit-info"
            onClick={() => openPopup("studentInfo")}
          >
            Edit profile info
          </button>
        </div>
        <div className="info-row">
          <span>Program/Course:</span>
          <span>{formData.course}</span>
        </div>
        <div className="info-row">
          <span>Birthday:</span>
          <span>
            <input type="date" value={formData.birthday} disabled />
          </span>
        </div>
        <div className="info-row">
          <span>Address:</span>
          <span>{formData.address}</span>
        </div>
      </div>

      <div className="content">
        <div className="head">
          <h4>Account info</h4>
          <button
            className="edit-info"
            onClick={() => openPopup("accountInfo")}
          >
            Edit account info
          </button>
        </div>
        <div className="info-row">
          <span>Email:</span>
          <span>
            <input type="email" value={formData.email} disabled />
          </span>
        </div>
        <div className="info-row">
          <span>Phone:</span>
          <span>
            <input type="number" value={formData.phone} disabled />
          </span>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h4>
              Edit{" "}
              {editSection === "studentInfo" ? "Student Info" : "Account Info"}
            </h4>
            {editSection === "studentInfo" ? (
              <>
                <label>
                  Program/Course:
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Birthday:
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </label>
              </>
            ) : (
              <>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Phone:
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </label>
              </>
            )}
            <div className="popup-buttons">
              <button onClick={saveChanges}>Save</button>
              <button onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentInfo;
