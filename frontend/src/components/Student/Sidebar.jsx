import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/icon.png";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You have been logged out");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <img src={Logo} alt="profile photo" />
        <div className="profile-name">
          <h4>Full Name</h4>
          <p>Student Number</p>
          <p>Email</p>
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
