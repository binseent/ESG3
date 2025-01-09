import React, { useState } from "react";
import axios from 'axios';
import "./Login.css";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");

  const [studentId, setStudentId] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [firstName, setFirstName] = useState(""); 
  const [middleName, setMiddleName] = useState(""); 
  const [lastName, setLastName] = useState(""); 

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/login", { studentId, password })
      .then((response) => {
        alert(response.data.message);  
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/register", {
      firstName,
      middleName,
      lastName,
      email,
      password,
      confirmPassword
    })
    .then((response) => {
      alert(response.data.message); 
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
  };

  const handleToggle = () => {
    setIsRegister(!isRegister);
    setForgotPassword(false);
  };

  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
  };

  const handleGoBack = () => {
    setForgotPassword(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (!email) {
      alert("Please enter an email address!");
      return;
    }

    alert(`Password reset request sent to admin!`);
  };

  return (
    <div className="login">
      {!forgotPassword ? (
        <>
          <h2 className={`title ${isRegister ? "registerTitle" : "loginTitle"}`}>
            {isRegister ? "Register an Account" : "Login with your Student Account"}
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
              <input type="text" placeholder="First Name" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" placeholder="Middle Name" className="input" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
              <input type="text" placeholder="Last Name" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <input type="email" placeholder="Email Address" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input type="password" placeholder="Confirm Password" className="input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <button className="registerButton" onClick={handleRegister}>Register</button>
            </div>
          ) : (
            <div className="loginForm">
              <input type="text" placeholder="Student ID" className="input" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
              <input type="password" placeholder="Password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="loginButton" onClick={handleLogin}>Log in</button>
              <button type="button" onClick={handleForgotPasswordClick} className="forgotPassword">Forgot Password?</button>
            </div>
          )}
        </>
      ) : (
        <div className="forgotPasswordForm">
          <h2 className="title">Enter your email for password reset</h2>

          <input type="email" placeholder="Email" className="input" />
          <button className="resetButton" onClick={handleResetPassword}>
            Reset
          </button>


          <input type="email" placeholder="Email" className="input" value={email} onChange={handleEmailChange} />
          <button className="resetButton" onClick={handleResetPassword}>Reset</button>

          <button className="goBackButton" onClick={handleGoBack}>
            <img src="https://cdn-icons-png.flaticon.com/512/93/93634.png" alt="Back" className="backIcon" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;

