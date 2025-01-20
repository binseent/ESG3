import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/icon.png";
import axios from "axios";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [studentData, setStudentData] = useState({
    fullName: "",
    studentNumber: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You have been logged out");
    navigate("/");
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const loggedInStudent = JSON.parse(
          localStorage.getItem("loggedInStudent")
        );
        if (loggedInStudent) {
          const response = await axios.get(
            `http://localhost:3000/api/student-info-data?email=${loggedInStudent.email}`
          );
          setStudentData({
            fullName: `${response.data.firstName} ${response.data.middleName} ${response.data.lastName}`,
            studentNumber: response.data.student_id
              ? response.data.student_id.toString()
              : "N/A", // Ensure it’s a string or handle fallback
            email: response.data.email,
          });
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        alert("Failed to load student information. Please try again.");
      }
    };

    fetchStudentData();
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <img src={Logo} alt="profile photo" />
        <div className="profile-name">
          <h4>{studentData.fullName || "No data available"}</h4>
          <p>{studentData.studentNumber || "N/A"}</p>
          <p>{studentData.email || "N/A"}</p>
        </div>
      </div>
      <ul>
        <li
          className={activeSection === "StudentInfo" ? "active" : ""}
          onClick={() => setActiveSection("StudentInfo")}
        >
          Student Info
        </li>
        <li
          className={activeSection === "EnrollmentDetails" ? "active" : ""}
          onClick={() => setActiveSection("EnrollmentDetails")}
        >
          Enrollment Details
        </li>
        <li
          className={activeSection === "EnrollmentForm" ? "active" : ""}
          onClick={() => setActiveSection("EnrollmentForm")}
        >
          Enrollment Form
        </li>
      </ul>
      <div className="logout">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </aside>
  );
};

export default Sidebar;
