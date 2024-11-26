import React, { useState } from "react";
import "./StudentManageTable.css";

const StudentManageTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Student data
  const students = [
    { id: "202410001", name: "John Doe", course: "Computer Science", year: "1st Year", status: "Enrolled" },
    { id: "202410002", name: "Jane Smith", course: "Information Technology", year: "2nd Year", status: "Pending" },
    { id: "202410003", name: "Mike Johnson", course: "Engineering", year: "3rd Year", status: "Enrolled" },
    { id: "202410004", name: "Emily Davis", course: "Computer Science", year: "4th Year", status: "Dropped" },
    { id: "202410005", name: "Matthew Lee", course: "Information Technology", year: "1st Year", status: "Pending" },
    { id: "202410006", name: "Amanda Brown", course: "Engineering", year: "2nd Year", status: "Enrolled" },
    { id: "202410007", name: "Chris Wilson", course: "Computer Science", year: "3rd Year", status: "Pending" },
    { id: "202410008", name: "Jessica White", course: "Information Technology", year: "4th Year", status: "Enrolled" },
  ];

  // Filtered students based on the search and filter values
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      student.id.toLowerCase().includes(searchInput.toLowerCase()) ||
      student.course.toLowerCase().includes(searchInput.toLowerCase());

    const matchesCourse = !filterCourse || student.course.toLowerCase() === filterCourse.toLowerCase();
    const matchesYear = !filterYear || student.year.toLowerCase() === filterYear.toLowerCase();
    const matchesStatus = !filterStatus || student.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesCourse && matchesYear && matchesStatus;
  });

  const resetFilters = () => {
    setSearchInput("");
    setFilterCourse("");
    setFilterYear("");
    setFilterStatus("");
  };

  return (
    <div className="student-manage-container">
      {/* Search and Filters */}
      <div className="student-manage-search-filter">
        <input
          type="text"
          id="searchInput"
          className="student-manage-search-box"
          placeholder="Search by Name, Student ID, or Course"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select
          id="filterCourse"
          className="student-manage-filter-dropdown"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        >
          <option value="">Course/Program</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Engineering">Engineering</option>
        </select>
        <select
          id="filterYear"
          className="student-manage-filter-dropdown"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          <option value="">Year Level</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>
        <select
          id="filterStatus"
          className="student-manage-filter-dropdown"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="Enrolled">Enrolled</option>
          <option value="Pending">Pending</option>
          <option value="Dropped">Dropped</option>
        </select>
        <button id="resetFilters" className="student-manage-reset-button" onClick={resetFilters}>
          Reset
        </button>
      </div>

      {/* Table */}
      <h2 className="student-manage-title">Students Management</h2>
      <table className="student-manage-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Year Level</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>{student.year}</td>
                <td>{student.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Additional Info Box */}
      <div className="student-manage-box">
        <p>Note: This section can contain controls or additional information.</p>
      </div>
    </div>
  );
};

export default StudentManageTable;
