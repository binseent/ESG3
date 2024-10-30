import React from "react";
import Logo from "../assets/LGCVSU.png";
import "../components/Background.css";

const Background = () => {
  return (
    <div className="background">
      <img src={Logo} alt="University Logo" className="logo" />
      <p className="slogan">Truth, Excellence, Service</p>
    </div>
  );
};
export default Background;
