import React from "react";
import Background from "../../components/Login/Background";
import Login from "../../components/Login/Login";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="container">
      <Background />
      <Login />
    </div>
  );
};

export default LoginPage;
