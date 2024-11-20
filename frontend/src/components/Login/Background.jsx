import React from "react";
import "./Background.css";
import Logo from "../../assets/LGCVSU.png";

const Background = () => {
  return (
    <div className="background" draggable="false">
      <img
        src={Logo}
        alt="University Logo"
        className="logo"
        draggable="false"
      />
      <p className="slogan">Truth, Excellence, Service</p>
    </div>
  );
};
export default Background;
