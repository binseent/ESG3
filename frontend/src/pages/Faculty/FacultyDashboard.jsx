import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Faculty/Sidebar";

const FacultyDashboard = () => {
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
export default FacultyDashboard;
