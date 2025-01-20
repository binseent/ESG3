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
    contactNumber: "",
  });

  const [studentData, setStudentData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
  });

  const [isFetching, setIsFetching] = useState(false);

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
    setIsFetching(true);
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
        ...response.data,
      }));
    } catch (error) {
      console.error("Error fetching student data:", error);
      alert("Failed to load student information. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const saveChanges = async () => {
    if (!formData.email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    setIsFetching(true);
    try {
      const response = await axios.put(
        "http://localhost:3000/api/update-student-info",
        formData
      );

      if (response.status === 200) {
        const updatedData = response.data.updatedData;

        setStudentData({
          ...studentData,
          ...updatedData,
        });

        localStorage.setItem("studentData", JSON.stringify(updatedData));
        alert("Changes saved successfully!");
        setIsPopupOpen(false);
      } else {
        alert("Failed to save changes.");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("An error occurred while saving your changes.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="contents">
      {isFetching && <div className="spinner">Loading...</div>}

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
          <input type="text" value={formData.course} disabled />
        </div>
        <div className="info-row">
          <span>Birthday:</span>
          <input type="text" value={formData.birthday} disabled />
        </div>
        <div className="info-row">
          <span>Address:</span>
          <input type="text" value={formData.address} disabled />
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
          <input type="email" value={formData.email} disabled />
        </div>
        <div className="info-row">
          <span>Phone:</span>
          <input type="tel" value={formData.contactNumber} disabled />
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h4>
              Edit{" "}
              {editSection === "studentInfo" ? "Student Info" : "Account Info"}
            </h4>
            {Object.entries(formData)
              .filter(([key]) =>
                editSection === "studentInfo"
                  ? ["course", "birthday", "address"].includes(key)
                  : ["email", "contactNumber"].includes(key)
              )
              .map(([key, value]) => (
                <label key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                  <input
                    type={key === "birthday" ? "date" : "text"}
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                  />
                </label>
              ))}
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
