import React, { useState } from "react";
import Sidebar from "../../components/Faculty/Sidebar";
import Header from "../../components/Student/Header";
import Checklist from "../../components/Faculty/Checklist";

const componentsMap = {
  Checklist: Checklist,
};

const FacultyDashboard = () => {
  const [activeSection, setActiveSection] = useState("Checklist");

  const studentData = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];

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

export default FacultyDashboard;
