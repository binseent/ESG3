import React from "react";
import Logo from "../../assets/LGCVSU.png";
import "./Dashboard.css";
import studentIcon from "../../assets/student-icon.png";
import formIcon from "../../assets/form-icon.png";
import documentIcon from "../../assets/document-icon.png";
import confirmIcon from "../../assets/confirm-icon.png";
import ITIcon from "../../assets/it-icon.png";
import CSIcon from "../../assets/cs-icon.png";

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
                <a href="/">Home</a>
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
          <div className="mission-vision-container">
            <div className="box">
              <h2 className="title">MISSION</h2>
              <p>
                Cavite State University shall provide excellent, equitable, and
                relevant educational opportunities in the arts, sciences, and
                technology through quality instruction and responsive research
                and development activities. It shall produce professional,
                skilled, and morally upright individuals for global
                competitiveness.
              </p>
            </div>
            <div className="box">
              <h2 className="title">VISION</h2>
              <p>
                The premier university in historic Cavite globally recognized
                for excellence in character development, academics, research,
                innovation, and sustainable community engagement.
              </p>
            </div>
          </div>

          <div className="location-container">
            <h2 className="title">Located at:</h2>
            <div className="map-box">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1359.69720164157!2d120.98143826427996!3d14.412618813004892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d22f4810979f%3A0xaf0dae4457b7d498!2sCavite%20State%20University%20-%20Bacoor%20Campus!5e1!3m2!1sen!2sph!4v1736782067299!5m2!1sen!2sph"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>

        <section className="courses" id="courses">
          <div className="course-card">
            <h2>INFORMATION TECHNOLOGY</h2>
            <img src={ITIcon} alt="Information Technology" />
          </div>
          <div className="course-card">
            <h2>COMPUTER SCIENCE</h2>
            <img src={CSIcon} alt="Computer Science" />
          </div>
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
