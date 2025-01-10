import React from "react";
import Logo from "../../assets/LGCVSU.png";
import Background from "../../assets/Bacoor.jpg";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="head">
        <div className="headerLogo">
          <div>
            <img src={Logo} className="logo" alt="cvsu-logo" />
          </div>
          <div className="headerTitle">
            <h1>Cavite State University - Bacoor City</h1>
          </div>
        </div>
        <div className="nav">
          <nav>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#courses">Courses</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="rays">
          <a href="/login">Login/Register</a>
        </div>
      </div>

      <div className="main">
        <section className="home">
          <h1>Welcome to CvSU Bacoor City Campus Online Enrollment Portal</h1>
          <p>Join the Squad. Enroll in Minutes.</p>
          <a href="/login">Enroll Now</a>
        </section>

        <section className="about" id="about">
          <h1>Hello World</h1>
        </section>

        <section className="courses" id="courses">
          <h1>Courses</h1>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
