import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AEnrolleesTable.css";

const AEnrolleesTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [enrollees, setEnrollees] = useState([]);
  
  const [modalType, setModalType] = useState("");
  const [selectedEnrollee, setSelectedEnrollee] = useState(null);
  const [newEnrollee, setNewEnrollee] = useState({
    id: "",
    name: "",
    sex: "",
    age: "",
    address: "",
    contact: "",
    status: "",
    course: "",
  });

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

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCourse("");
  };

  // Open modal
  const openModal = (type, enrollee = null) => {
    setModalType(type);
    setSelectedEnrollee(enrollee);
    setNewEnrollee(
      enrollee || {
        id: "",
        name: "",
        sex: "",
        age: "",
        address: "",
        contact: "",
        status: "",
        course: "",
      }
    );
  };

  // Close modal
  const closeModal = () => {
    setModalType("");
    setSelectedEnrollee(null);
    setNewEnrollee({
      id: "",
      name: "",
      sex: "",
      age: "",
      address: "",
      contact: "",
      status: "",
      course: "",
    });
  };

  // Add new enrollee
  const handleAdd = () => {
    setEnrollees([...enrollees, newEnrollee]);
    closeModal();
  };

  // Edit enrollee
  const handleEdit = () => {
    setEnrollees(
      enrollees.map((enrollee) =>
        enrollee.id === selectedEnrollee.id ? newEnrollee : enrollee
      )
    );
    closeModal();
  };

  // Delete enrollee
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this enrollee?")) {
      setEnrollees(enrollees.filter((enrollee) => enrollee.id !== id));
    }
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="enrollees-filter-dropdown"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Course</option>
          <option value="BSIT">BSIT</option>
          <option value="BSCS">BSCS</option>
          <option value="BSBA">BSBA</option>
          <option value="BSEd">BSEd</option>
          <option value="BSN">BSN</option>
          <option value="BSA">BSA</option>
        </select>
        <button className="enrollees-reset-button" onClick={resetFilters}>
          Reset
        </button>
        <button
          className="enrollees-reset-button"
          onClick={() => openModal("add")}
        >
          Add Enrollee
        </button>
      </div>

      {/* Table Section */}
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
            {filteredEnrollees.length > 0 ? (
              filteredEnrollees.map((enrollee) => (
                <tr key={enrollee.id}>
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
                    <button onClick={() => openModal("view", enrollee)}>
                      View
                    </button>
                    <button onClick={() => openModal("edit", enrollee)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(enrollee.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No enrollees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Section */}
      {modalType && (
        <div className="modal2">
          <div className="modal-content2">
            <h3>
              {modalType === "view"
                ? "View Enrollee"
                : modalType === "edit"
                ? "Edit Enrollee"
                : "Add Enrollee"}
            </h3>
            {modalType === "view" ? (
              <div>
                <p>
                  <strong>ID:</strong> {selectedEnrollee?.id}
                </p>
                <p>
                  <strong>Name:</strong> {selectedEnrollee?.full_name}
                </p>
                <p>
                  <strong>Sex:</strong> {selectedEnrollee?.sex}
                </p>
                <p>
                  <strong>Age:</strong> {selectedEnrollee?.age}
                </p>
                <p>
                  <strong>Address:</strong> {selectedEnrollee?.address}
                </p>
                <p>
                  <strong>Contact No.:</strong> {selectedEnrollee?.contact}
                </p>
                <p>
                  <strong>Status:</strong> {selectedEnrollee?.status}
                </p>
                <p>
                  <strong>Course:</strong> {selectedEnrollee?.program}
                </p>
              </div>
            ) : (
              <>
                <label>Name:</label>
                <input
                  type="text"
                  value={newEnrollee.name}
                  onChange={(e) =>
                    setNewEnrollee({ ...newEnrollee, name: e.target.value })
                  }
                />
                <label>Sex:</label>
                <input
                  type="text"
                  value={newEnrollee.sex}
                  onChange={(e) =>
                    setNewEnrollee({ ...newEnrollee, sex: e.target.value })
                  }
                />
                <label>Age:</label>
                <input
                  type="number"
                  value={newEnrollee.age}
                  onChange={(e) =>
                    setNewEnrollee({ ...newEnrollee, age: e.target.value })
                  }
                />
                <label>Address:</label>
                <input
                  type="text"
                  value={newEnrollee.address}
                  onChange={(e) =>
                    setNewEnrollee({ ...newEnrollee, address: e.target.value })
                  }
                />
                <label>Contact No.:</label>
                <input
                  type="text"
                  value={newEnrollee.contact}
                  onChange={(e) =>
                    setNewEnrollee({ ...newEnrollee, contact: e.target.value })
                  }
                />
                <label>Status:</label>
                <input
                  type="text"
                  value={newEnrollee.status}
                  onChange={(e) =>
                    setNewEnrollee({ ...newEnrollee, status: e.target.value })
                  }
                />
                <label>Course:</label>
                <input
                  type="text"
                  value={newEnrollee.course}
                  onChange={(e) =>
                    setNewEnrollee({ ...newEnrollee, course: e.target.value })
                  }
                />
                <button onClick={modalType === "edit" ? handleEdit : handleAdd}>
                  {modalType === "edit" ? "Save Changes" : "Add Enrollee"}
                </button>
              </>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AEnrolleesTable;
