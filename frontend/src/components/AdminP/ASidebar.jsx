import React from "react";
import { useNavigate } from "react-router-dom";
import "./ASidebar.css";

const ASidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You have been logged out");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <ul>
        <li
          className={activeSection === "StudentManageTable" ? "active" : ""}
          onClick={() => setActiveSection("StudentManageTable")}
        >
          Enrolled Students
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
      <div className="logout">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </aside>
  );
};

export default ASidebar;
