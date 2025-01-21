import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You have been logged out");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <ul>
        <li
          className={activeSection === "Checklist" ? "active" : ""}
          onClick={() => setActiveSection("Checklist")}
        >
          Checklist
        </li>
      </ul>
      <div className="logout">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </aside>
  );
};

export default Sidebar;
