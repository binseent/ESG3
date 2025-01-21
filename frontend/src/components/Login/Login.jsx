//Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [status, setStatus] = useState("New");
  const [course, setCourse] = useState("IT");

  const navigate = useNavigate();

  // Handle login for both Admin and Student
  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("https://esg-3.vercel.app/api/login", { email, password })
      .then((response) => {
        if (response.data.message === "Admin login successful") {
          alert(response.data.message);
          localStorage.setItem(
            "loggedInAdmin",
            JSON.stringify(response.data.admin)
          );
          navigate("/admin");
        } else if (response.data.message === "Login successful") {
          alert(response.data.message);
          localStorage.setItem(
            "loggedInStudent",
            JSON.stringify(response.data.student)
          );
          navigate("/student");
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    axios
      .post("https://esg-3.vercel.app/api/register", {
        firstName,
        middleName,
        lastName,
        email,
        password,
        confirmPassword,
        age,
        birthday,
        address,
        contactNumber,
        status,
        course,
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Please fill in all required fields!");
      return;
    }
  };

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (!email) {
      alert("Please enter an email address!");
      return;
    }

    axios
      .post("https://esg-3.vercel.app/api/forgot-password", { email })
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
              <input
                type="text"
                placeholder="First Name"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Middle Name"
                className="input"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <input
                type="number"
                placeholder="Age"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <input
                type="date"
                placeholder="Birthday"
                className="input"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address"
                className="input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Contact Number"
                className="input"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
              <select
                className="input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="New">New Student</option>
                <option value="Old">Old Student</option>
                <option value="Irregular">Irregular</option>
                <option value="Transferee">Transferee</option>
                <option value="Shiftee">Shiftee</option>
                <option value="Graduated">Graduated</option>
                <option value="DROP">DROP</option>
              </select>
              <select
                className="input"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="Bachelor of Science in Information Technology">
                  Bachelor of Science in Information Technology
                </option>
                <option value="Bachelor of Science in Computer Science">
                  Bachelor of Science in Computer Science
                </option>
              </select>
              <button className="registerButton" onClick={handleRegister}>
                Register
              </button>
            </div>
          ) : (
            <div className="loginForm">
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="loginButton" onClick={handleLogin}>
                Log in
              </button>
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="resetButton" onClick={handleResetPassword}>
            Reset
          </button>

          <button className="goBackButton" onClick={handleGoBack}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/93/93634.png"
              alt="Back"
              className="backIcon"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
