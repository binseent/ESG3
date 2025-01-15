import React from "react";
import "./ASidebar.css";

const ASidebar = ({ activeSection, setActiveSection }) => (
  <aside className="sidebar">
    <ul>
      <li
        className={activeSection === "StudentManageTable" ? "active" : ""}
        onClick={() => setActiveSection("StudentManageTable")}
      >
        Enrolled Students
      </li>
      <li
        className={activeSection === "Checklist" ? "active" : ""}
        onClick={() => setActiveSection("Checklist")}
      >
        Course Checklist
      </li>
      <li
        className={activeSection === "AEnrolleesTable" ? "active" : ""}
        onClick={() => setActiveSection("AEnrolleesTable")}
      >
        New Enrollees
      </li>
      <li
        className={activeSection === "ResetPass" ? "active" : ""}
        onClick={() => setActiveSection("ResetPass")}
      >
        Reset Password Request
      </li>
    </ul>
  </aside>
);

export default ASidebar;
