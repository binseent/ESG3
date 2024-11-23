import React from "react";
import Icon from "../../assets/icon.png";

const StudentInfo = () => (
  <div className="contents">
    <h3>Your info</h3>
    <div className="content">
      <div className="profile">
        <div className="profile-photo">
          <img src={Icon} alt="Profile" />
        </div>
        <div className="profile-details">
          <h4>
            Welcome,{" "}
            <input
              type="text"
              placeholder="Full Name (get data from db)"
              disabled
            />
          </h4>
          <p>Student Number</p>
          <input
            type="file"
            className="change-photo"
            accept=".png, .jpg, .jpeg"
            name="Change photo"
          />
        </div>
      </div>
    </div>
    <div className="content">
      <h4>Student info</h4>
      <div className="info-row">
        <span>Program/Course:</span>
        <span>Bachelor of Science in Computer Science</span>
      </div>
      <div className="info-row">
        <span>Birthday:</span>
        <span>
          <input type="date" disabled />
        </span>
      </div>
      <div className="info-row">
        <span>Address:</span>
        <span>Your address here!</span>
      </div>
      <button className="edit-info">Edit profile info</button>
    </div>
    <div className="content">
      <h4>Account info</h4>
      <div className="info-row">
        <span>Email:</span>
        <span>
          <input type="email" placeholder="email@gmail.com" disabled />
        </span>
      </div>
      <div className="info-row">
        <span>Phone:</span>
        <span>
          <input type="number" placeholder="+639_________" disabled />
        </span>
      </div>
      <button className="edit-info">Edit account info</button>
    </div>
  </div>
);

export default StudentInfo;
