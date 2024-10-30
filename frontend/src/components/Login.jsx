import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login">
      <h2 className="title">Login with your Student Account</h2>
      <div className="buttonContainer">
        <button className="button activeButton">LOG IN</button>
        <button className="button">REGISTER</button>
      </div>
      <input type="text" placeholder="Student ID" className="input" />
      <input type="password" placeholder="Password" className="input" />
      <button className="loginButton">Log in</button>
      <a href="/" className="forgotPassword">
        Forgot Password?
      </a>
    </div>
  );
}

export default Login;
