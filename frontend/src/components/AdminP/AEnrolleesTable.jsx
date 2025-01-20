import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AEnrolleesTable.css';

const AEnrolleesTable = () => {
  const [enrollees, setEnrollees] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [selectedCourse, setSelectedCourse] = useState(""); // State for selected course filter
  const [showModal, setShowModal] = useState(false); // For controlling the modal visibility

  // Function to fetch enrollees data
  const fetchEnrolleesTable = () => {
    axios.get('http://localhost:3000/api/enrollees-table')
      .then(response => {
        setEnrollees(response.data);
      })
      .catch(error => {
        console.error('Error fetching enrollees:', error);
      });
  };

  // Fetch enrollees data when the component mounts
  useEffect(() => {
    fetchEnrolleesTable();
  }, []);

  // Filter enrollees based on the search query and selected course
  const filteredEnrollees = enrollees.filter(enrollee =>
    enrollee.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCourse ? enrollee.program === selectedCourse : true) // Filter by course if selected
  );

  return (
    <div className="enrollees-container">
      <h1 className="enrollees-title">New Enrollees</h1>

      {/* Filters Section */}
      <div className="enrollees-search-filter">
        <select
          className="enrollees-filter-dropdown"
          value={selectedCourse}
          onChange={e => setSelectedCourse(e.target.value)}
        >
          <option value="">All Courses</option> {/* Option to not filter */}
          <option value="BSIT">BSIT</option>
          <option value="BSCS">BSCS</option>
          <option value="BSA">BSA</option>
        </select>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Name"
        className="enrollees-search-box"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      {/* Add Student Button */}
      <div>
        <button className="add-student-button" onClick={() => setShowModal(true)}>Add Student</button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal2">
          <div className="modal-content2">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add New Student</h2>
            {/* Add Student Form (You can customize this as needed) */}
            <form>
              <label>Full Name</label>
              <input type="text" placeholder="Full Name" />
              <label>Email</label>
              <input type="email" placeholder="Email" />
              <label>Course Program</label>
              <input type="text" placeholder="Course Program" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Scrollable Table Section */}
      <div className="enrollees-table-container">
        <table className="enrollees-table">
          <thead>
            <tr>
              <th>Enrollment ID</th>
              <th>Student ID</th>
              <th>Course Code</th>
              <th>Enrollment Date</th>
              <th>Full Name</th>
              <th>Date of Birth</th>
              <th>Contact No.</th>
              <th>Email</th>
              <th>Address</th>
              <th>Previous School</th>
              <th>Previous Program</th>
              <th>Academic Year</th>
              <th>Current Program</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnrollees.map(enrollee => (
              <tr key={enrollee.enrollment_id}>
                <td>{enrollee.enrollment_id}</td>
                <td>{enrollee.student_id}</td>
                <td>{enrollee.course_code}</td>
                <td>{enrollee.enrollment_date}</td>
                <td>{enrollee.full_name}</td>
                <td>{enrollee.dob}</td>
                <td>{enrollee.contact_number}</td>
                <td>{enrollee.email}</td>
                <td>{enrollee.address}</td>
                <td>{enrollee.prev_school_name}</td>
                <td>{enrollee.prev_program}</td>
                <td>{enrollee.academic_year}</td>
                <td>{enrollee.program}</td>
                <td>
                  {/* Action buttons */}
                  <button className="action-button">View</button>
                  <button className="action-button">Edit</button>
                  <button className="action-button">Delete</button>
                  <button className="action-button">Approve</button>
                  <button className="action-button">Reject</button>
                  <button className="action-button">Documents</button>
                </td>
              </tr>
            ))}
            {filteredEnrollees.length === 0 && (
              <tr>
                <td colSpan="14">No enrollees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AEnrolleesTable;
