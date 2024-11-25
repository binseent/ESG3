import React from "react";
import "./AHeader.css";

const AHeader = () => {
  return (
    <header className="header">
      <div className="header-title">
        Cavite State University (Bacoor) - ADMIN
      </div>
      <div className="header-admin">
        <span>Hi, Admin</span>
        <div className="header-profile"></div>
      </div>
    </header>
  );
};

export default AHeader;
