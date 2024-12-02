import React, { useState } from "react";
import "./AEnrolleesTable.css";

const AEnrolleesTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Example Enrollees Data
  const enrollees = [
    { id: 1, name: "John Doe", sex: "Male", age: 20, address: "123 Sample St.", contact: "09123456789", status: "Enrolled", course: "BSIT" },
    { id: 2, name: "Jane Smith", sex: "Female", age: 21, address: "456 Elm St.", contact: "09234567890", status: "Enrolled", course: "BSCS" },
    { id: 3, name: "Michael Brown", sex: "Male", age: 19, address: "789 Maple Ave.", contact: "09345678901", status: "Pending", course: "BSBA" },
    { id: 4, name: "Emily Johnson", sex: "Female", age: 22, address: "101 Pine St.", contact: "09456789012", status: "Enrolled", course: "BSIT" },
    { id: 5, name: "Chris Lee", sex: "Male", age: 20, address: "202 Oak Rd.", contact: "09567890123", status: "Enrolled", course: "BSEd" },
    { id: 6, name: "Anna Davis", sex: "Female", age: 21, address: "303 Birch Ln.", contact: "09678901234", status: "Pending", course: "BSN" },
    { id: 7, name: "James Wilson", sex: "Male", age: 23, address: "404 Cedar Ave.", contact: "09789012345", status: "Enrolled", course: "BSCS" },
    { id: 8, name: "Olivia Martinez", sex: "Female", age: 19, address: "505 Spruce Blvd.", contact: "09890123456", status: "Enrolled", course: "BSIT" },
    { id: 9, name: "Daniel Garcia", sex: "Male", age: 20, address: "606 Willow St.", contact: "09901234567", status: "Enrolled", course: "BSBA" },
    { id: 10, name: "Sophia Robinson", sex: "Female", age: 18, address: "707 Aspen Rd.", contact: "09111234567", status: "Pending", course: "BSA" },
  ];

  // Filter the enrollees based on search and filters
  const filteredEnrollees = enrollees.filter((enrollee) => {
    const matchesSearch =
      enrollee.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      enrollee.id.toString().includes(searchInput) ||
      enrollee.course.toLowerCase().includes(searchInput.toLowerCase());
    const matchesCourse =
      !filterCourse || enrollee.course.toLowerCase() === filterCourse.toLowerCase();
    const matchesStatus =
      !filterStatus || enrollee.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesCourse && matchesStatus;
  });

  const resetFilters = () => {
    setSearchInput("");
    setFilterCourse("");
    setFilterStatus("");
  };

  return (
    <div className="enrollees-container">
      <h1 className="enrollees-title">New Enrollees</h1>

      {/* Search and Filter Section */}
      <div className="enrollees-search-filter">
        <input
          type="text"
          className="enrollees-search-box"
          placeholder="Search by Name, ID, or Course"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select
          className="enrollees-filter-dropdown"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        >
          <option value="">Course</option>
          <option value="BSIT">BSIT</option>
          <option value="BSCS">BSCS</option>
          <option value="BSBA">BSBA</option>
          <option value="BSEd">BSEd</option>
          <option value="BSN">BSN</option>
          <option value="BSA">BSA</option>
        </select>
        <select
          className="enrollees-filter-dropdown"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="Enrolled">Enrolled</option>
          <option value="Pending">Pending</option>
        </select>
        <button className="enrollees-reset-button" onClick={resetFilters}>
          Reset
        </button>
      </div>

      {/* Table */}
      <table className="enrollees-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Age</th>
            <th>Address</th>
            <th>Contact No.</th>
            <th>Status</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {filteredEnrollees.length > 0 ? (
            filteredEnrollees.map((enrollee) => (
              <tr key={enrollee.id}>
                <td>{enrollee.id}</td>
                <td>{enrollee.name}</td>
                <td>{enrollee.sex}</td>
                <td>{enrollee.age}</td>
                <td>{enrollee.address}</td>
                <td>{enrollee.contact}</td>
                <td>{enrollee.status}</td>
                <td>{enrollee.course}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No enrollees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AEnrolleesTable;
