import React, { useState } from "react";
import "./LoginPage.css"; // For additional styling

const LoginPage = () => {
  // Toggle between "Log in" and "Password Reset"
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="toggle-buttons">
          {/* Toggle button for switching between Log In and Password Reset */}
          <div className="switch-toggle">
            <button
              type="button"
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Log in
            </button>
            <button
              type="button"
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Password Reset
            </button>
          </div>
        </div>

        <form>
          {isLogin ? (
            <>
              <h2>Log in with your Student Account</h2>
              <input type="text" placeholder="Student ID" />
              <input type="password" placeholder="Password" />
              <button type="submit">Log In</button>
            </>
          ) : (
            <>
              <h2>Reset your Password</h2>
              <input type="email" placeholder="Enter your Email" />
              <button type="submit">Reset Password</button>
            </>
          )}
        </form>

        {isLogin && (
          <div className="register-link">
            <a href="/register">Not a student yet? Click here to register!</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
