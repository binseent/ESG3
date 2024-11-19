import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");  

  const handleToggle = () => {
    setIsRegister(!isRegister);
    setForgotPassword(false);
  };

  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value); 
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (!email) {
      alert("Please enter an email address!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), 
      });

      if (response.ok) {
        alert("Password reset email sent!");
      } else {
        alert("Error sending password reset email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to the server.");
    }
  };

  return (
    <div className="login">
      {!forgotPassword ? (
        <>
          <h2
            className={`title ${isRegister ? "registerTitle" : "loginTitle"}`}
          >
            {isRegister
              ? "Register an Account"
              : "Login with your Student Account"}
          </h2>
          <div className="buttonContainer">
            <button
              className={`button ${!isRegister ? "activeButton" : ""}`}
              onClick={() => setIsRegister(false)}
            >
              LOG IN
            </button>
            <button
              className={`button ${isRegister ? "activeButton" : ""}`}
              onClick={() => setIsRegister(true)}
            >
              REGISTER
            </button>
          </div>

          {isRegister ? (
            <div className="registerForm">
              <input type="text" placeholder="First Name" className="input" />
              <input type="text" placeholder="Middle Name" className="input" />
              <input type="text" placeholder="Last Name" className="input" />
              <input
                type="email"
                placeholder="Email Address"
                className="input"
              />
              <input type="password" placeholder="Password" className="input" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="input"
              />
              <button className="registerButton">Register</button>
            </div>
          ) : (
            <div className="loginForm">
              <input type="text" placeholder="Student ID" className="input" />
              <input type="password" placeholder="Password" className="input" />
              <button className="loginButton">Log in</button>
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="forgotPassword"
              >
                Forgot Password?
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="forgotPasswordForm">
          <h2 className="title">Enter your email for password reset</h2>
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}  
            onChange={handleEmailChange}  
          />
          <button
            className="resetButton"
            onClick={handleResetPassword} 
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
