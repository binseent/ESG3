import React from "react";
import Logo from "../../assets/LGCVSU.png";
import "./Dashboard.css";
import studentIcon from "../../assets/student-icon.png";
import formIcon from "../../assets/form-icon.png";
import documentIcon from "../../assets/document-icon.png";
import confirmIcon from "../../assets/confirm-icon.png";

const Dashboard = () => {
  return (
    <>
      <div className="head-dashboard">
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

          <div className="choose">
            <h3>Why Choose Us?</h3>
            <div className="card-container">
              <div className="card">
                <h4>Easy Online Application</h4>
                <p>Complete your enrollment in minutes.</p>
              </div>
              <div className="card">
                <h4>Secure Document Upload</h4>
                <p>Your data is safe with us.</p>
              </div>
              <div className="card">
                <h4>Flexible Course Options</h4>
                <p>Choose from various programs.</p>
              </div>
              <div className="card">
                <h4>24/7 Support</h4>
                <p>Assistance whenever you need it.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <h1>Hello World</h1>
        </section>

        <section className="courses" id="courses">
          <h1>Courses</h1>
        </section>

        <footer className="footer">
          <h3>HOW TO ENROLL</h3>
          <ol className="steps">
            <li className="step">
              <img src={studentIcon} alt="Student Type" />
              <p>Select Your Student Type</p>
            </li>
            <span className="arrow" aria-hidden="true">
              ➔
            </span>
            <li className="step">
              <img src={formIcon} alt="Enrollment Form" />
              <p>Fill Out the Enrollment Form</p>
            </li>
            <span className="arrow" aria-hidden="true">
              ➔
            </span>
            <li className="step">
              <img src={documentIcon} alt="Upload Documents" />
              <p>Upload Required Documents</p>
            </li>
            <span className="arrow" aria-hidden="true">
              ➔
            </span>
            <li className="step">
              <img
                src={confirmIcon}
                alt="Confirm Enrollment"
                className="check"
              />
              <p>Submit and Confirm Enrollment</p>
            </li>
          </ol>
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
