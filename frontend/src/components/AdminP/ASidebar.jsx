import React from "react";
import "./ASidebar.css";

const ASidebar = ({ activeSection, setActiveSection }) => (
  <aside className="sidebar">
    <ul>
      <li
        className={activeSection === "Home" ? "active" : ""}
        onClick={() => setActiveSection("Home")}
      >
        Home
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
