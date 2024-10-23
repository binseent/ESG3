import React from "react";
import Header from "../components/Header";
import LoginPage from "../components/LoginPage";

const Login = () => {
  return (
    <>
      <div className="header">
        <Header />
      </div>

      <div className="body">
        <LoginPage />
      </div>
    </>
  );
};
export default Login;
