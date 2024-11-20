import React from "react";
import "./Sidebar.css";
import Logo from "../../assets/icon.png";

const Sidebar = ({ activeSection, setActiveSection }) => (
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
        Your Info
      </li>
      <li
        className={activeSection === "EnrollmentDetails" ? "active" : ""}
        onClick={() => setActiveSection("EnrollmentDetails")}
      >
        Enrollment Details
      </li>
      <li
        className={activeSection === "Course" ? "active" : ""}
        onClick={() => setActiveSection("Course")}
      >
        Course Schedule
      </li>
      <li
        className={activeSection === "Academic" ? "active" : ""}
        onClick={() => setActiveSection("Academic")}
      >
        Academic Records
      </li>
      <li
        className={activeSection === "Documents" ? "active" : ""}
        onClick={() => setActiveSection("Documents")}
      >
        Documents
      </li>
    </ul>
  </aside>
);

export default Sidebar;
