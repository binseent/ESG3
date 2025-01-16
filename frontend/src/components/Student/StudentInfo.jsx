// StudentInfo.jsx
import React, { useState, useEffect } from "react";

import axios from "axios";

import Icon from "../../assets/icon.png";
import axios from 'axios'; 

const StudentInfo = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editSection, setEditSection] = useState("");


  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (studentInfo.email) {
      axios
        .post("/student-info", { email: studentInfo.email })
        .then((response) => {
          setStudentInfo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching student info:", error);
        });
    }
  }, [studentInfo.email]);


  useEffect(() => {
    if (email) {
      axios.get(`/api/student-info/${email}`)
        .then(response => {
          setStudentInfo(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the student info!", error);
        });
    }
  }, [email]);



  const [formData, setFormData] = useState({
    course: "Bachelor of Science in Computer Science",
    birthday: "",
    address: "Your address here!",
    email: "Email address",
    phone: "639",
  });
  const [studentData, setStudentData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
  });

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

  const saveChanges = () => {
    closePopup();
  };

  useEffect(() => {
  const fetchStudentData = async () => {
    try {
      const response = await axios.get('/student-info-data', {
        params: { email: formData.email },  
      });
      if (response.data) {
        setStudentData(response.data);  
        console.log("Student Data After Fetch:", response.data);  
      } else {
        console.error("Empty response data");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  if (formData.email) {
    fetchStudentData();
  }
}, [formData.email]); 

  
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


              Welcome,{studentInfo.firstName} {studentInfo.middleName}{" "}
              {studentInfo.lastName}

              Welcome, 


              <input
                type="text"
                placeholder="Full Name (get data from db)"
                value={`${studentData.firstName} ${studentData.middleName} ${studentData.lastName}`}
                disabled
              />
            </h4>
            <p>First Name: {`${studentData.firstName}`}</p>
            <p>Middle Name: {`${studentData.middleName}`}</p>
            <p>Last Name: {`${studentData.lastName}`}</p>
            <p>Email: {`${studentData.email}`}</p>
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
