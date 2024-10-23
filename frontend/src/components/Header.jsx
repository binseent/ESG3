import React from "react";
import './Header.css'
import LGCVSU from '../assets/LGCVSU.png'

const Header =() => {
    return (
      <div className="header">
        <div className="headerlogo">
          <div>
            <img src={LGCVSU} className="logo" alt="" />
          </div>
          <div className="headertitle">
            <h1>Cavite State University</h1>
            <div className="header-line"></div>
            <p>Enrollment System</p>
          </div>
        </div>
      </div>

      );
};
export default Header;