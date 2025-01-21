import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Student/Header.jsx";
import Sidebar from "../../components/Student/Sidebar.jsx";
import StudentInfo from "../../components/Student/StudentInfo.jsx";
import EnrollmentDetails from "../../components/Student/EnrollmentDetails.jsx";
import EnrollmentForm from "../../components/Student/EnrollmentForm.jsx";
import "./StudentDashboard.css";

const componentsMap = {
  StudentInfo: StudentInfo,
  EnrollmentDetails: EnrollmentDetails,
  EnrollmentForm: EnrollmentForm,
};

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("StudentInfo");
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const loggedInStudent = JSON.parse(localStorage.getItem("loggedInStudent"));
    if (loggedInStudent) {
      axios
        .get(
          `https://esg-3.vercel.app/student-info-data?email=${loggedInStudent.email}`
        )
        .then((response) => {
          setStudentData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
        });
    }
  }, []);

  if (!studentData) return <p>Loading...</p>;

  const ActiveComponent =
    componentsMap[activeSection] ||
    (() => <p>Select a section from the sidebar.</p>);

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="dashboard-main">
          <div>
            <ActiveComponent studentData={studentData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
