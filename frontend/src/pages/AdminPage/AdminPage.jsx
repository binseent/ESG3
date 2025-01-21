import React, { useState } from "react";
import Header from "../../components/Student/Header.jsx";
import Sidebar from "../../components/AdminP/ASidebar.jsx";
import AEnrolleesTable from "../../components/AdminP/AEnrolleesTable.jsx";
import ResetPass from "../../components/AdminP/ResetPass.jsx";
import StudentManageTable from "../../components/AdminP/StudentManageTable.jsx";
import "./AdminPage.css";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("StudentManageTable");

  const renderContent = () => {
    if (activeSection === "StudentManageTable") {
      return <StudentManageTable />;
    } else if (activeSection === "AEnrolleesTable") {
      return <AEnrolleesTable />;
    } else if (activeSection === "ResetPass") {
      return <ResetPass />;
    }
    return <p>Select a section from the sidebar.</p>;
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="dashboard-main">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminPage;
