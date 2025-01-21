import { useState, useEffect } from "react";
import axios from "axios";
import "./AEnrolleesTable.css";
import { v4 as uuidv4 } from "uuid"; // Import uuid library

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
    axios
      .get("http://localhost:3000/api/enrollees-table")
      .then((response) => {
        console.log("Fetched enrollees:", response.data); // Log the fetched data
        setEnrollees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching enrollees:", error);
      });
  };

  // Fetch enrollees data when the component mounts
  useEffect(() => {
    fetchEnrolleesTable();
  }, []);

  // Filter enrollees based on the search query and selected course
  const filteredEnrollees = enrollees.filter(
    (enrollee) =>
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
    const enrolleeWithId = { ...newEnrollee, id: uuidv4() }; // Assign a unique id
    setEnrollees([...enrollees, enrolleeWithId]);
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

  // Handle document action
  const handleDocuments = (id) => {
    // Implement the logic to handle documents action
    console.log(`Documents for enrollee ID: ${id}`);
  };

  // Handle approve action
  const handleApprove = (id) => {
    console.log("Approving enrollee with id:", id); // Debug log
    setEnrollees(
      enrollees.map((enrollee) =>
        enrollee.id === id
          ? { ...enrollee, enrollment_status: "Approved" }
          : enrollee
      )
    );
  };

  // Handle reject action
  const handleReject = (id) => {
    console.log("Rejecting enrollee with id:", id); // Debug log
    setEnrollees(
      enrollees.map((enrollee) =>
        enrollee.id === id
          ? { ...enrollee, enrollment_status: "Rejected" }
          : enrollee
      )
    );
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
              <th>Full Name</th>
              <th>Contact No.</th>
              <th>Course</th>
              <th>Email</th>
              <th>Enrollment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnrollees.length > 0 ? (
              filteredEnrollees.map((enrollee, index) => (
                <tr key={enrollee.id || index}>
                  <td>{enrollee.enrollment_id}</td>
                  <td>{enrollee.student_id}</td>
                  <td>{enrollee.full_name}</td>
                  <td>{enrollee.contactNumber}</td>
                  <td>{enrollee.course}</td>
                  <td>{enrollee.email}</td>
                  <td>{enrollee.enrollment_status}</td>
                  <td>
                    <button
                      className="small-button"
                      onClick={() => openModal("view", enrollee)}
                    >
                      View
                    </button>
                    <button
                      className="small-button"
                      onClick={() => openModal("edit", enrollee)}
                    >
                      Edit
                    </button>
                    <button
                      className="small-button"
                      onClick={() => handleDocuments(enrollee.id)}
                    >
                      Documents
                    </button>
                    <button
                      className="small-button"
                      onClick={() => handleApprove(enrollee.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="small-button"
                      onClick={() => handleReject(enrollee.id)}
                    >
                      Reject
                    </button>
                  </td>
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
                  <strong>Course:</strong> {selectedEnrollee?.course}
                </p>
                <p>
                  <strong>Enrollment Date:</strong>{" "}
                  {selectedEnrollee?.enrollment_date}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {selectedEnrollee?.dob}
                </p>
                <p>
                  <strong>Previous School:</strong>{" "}
                  {selectedEnrollee?.prev_school_name}
                </p>
                <p>
                  <strong>Previous Program:</strong>{" "}
                  {selectedEnrollee?.prev_program}
                </p>
                <p>
                  <strong>Academic Year:</strong>{" "}
                  {selectedEnrollee?.academic_year}
                </p>
                <p>
                  <strong>Current Program:</strong> {selectedEnrollee?.program}
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
                <button
                  className="small-button"
                  onClick={modalType === "edit" ? handleEdit : handleAdd}
                >
                  {modalType === "edit" ? "Save Changes" : "Add Enrollee"}
                </button>
              </>
            )}
            <button className="small-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AEnrolleesTable;
