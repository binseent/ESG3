import React from "react";
import "./Header.css";
import LGCVSU from "../../assets/LGCVSU.png";

const Header = () => {
  return (
    <div className="header">
      <div className="headerLogo">
        <div>
          <img src={LGCVSU} className="logo" alt="cvsu-logo" />
        </div>
        <div className="headerTitle">
          <h1>Cavite State University - Bacoor City</h1>
        </div>
      </div>
    </div>
  );
};
export default Header;
