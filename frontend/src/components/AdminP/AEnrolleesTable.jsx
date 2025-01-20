import React, { useState, useEffect } from "react";
import "./AEnrolleesTable.css";

const AEnrolleesTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Enrollees Data
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

  useEffect(() => {
    fetch("/api/enrollees")
      .then((response) => response.json())
      .then((data) => setEnrollees(data))
      .catch((error) => console.error("Error fetching enrollees:", error));
  }, []);

  // Filter the enrollees based on search and filters
  const filteredEnrollees = enrollees.filter((enrollee) => {
    const matchesSearch =
      enrollee.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      enrollee.id.toString().includes(searchInput) ||
      enrollee.course.toLowerCase().includes(searchInput.toLowerCase());
    const matchesCourse =
      !filterCourse ||
      enrollee.course.toLowerCase() === filterCourse.toLowerCase();
    const matchesStatus =
      !filterStatus ||
      enrollee.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesCourse && matchesStatus;
  });

  const resetFilters = () => {
    setSearchInput("");
    setFilterCourse("");
    setFilterStatus("");
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

  const generateReferenceNumber = () => {
    return `REF-${Date.now()}`;
  };

  const approveEnrollee = (id) => {
    setEnrollees(
      enrollees.map((enrollee) =>
        enrollee.id === id
          ? {
              ...enrollee,
              status: "Approved",
              paymentReference: generateReferenceNumber(),
            }
          : enrollee
      )
    );
  };

  const rejectEnrollee = (id, reason) => {
    alert(`Enrollee rejected. Reason: ${reason}`);
    setEnrollees(
      enrollees.map((enrollee) =>
        enrollee.id === id ? { ...enrollee, status: "Rejected" } : enrollee
      )
    );
  };

  const handlePaymentVerification = (id) => {
    setEnrollees(
      enrollees.map((enrollee) =>
        enrollee.id === id ? { ...enrollee, paymentVerified: true } : enrollee
      )
    );
    alert("Payment verified successfully!");
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
              <th>ID</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Age</th>
              <th>Address</th>
              <th>Contact No.</th>
              <th>Status</th>
              <th>Course</th>
              <th>Actions</th>
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
                  <td>
                    <button
                      onClick={() => openModal("viewDocuments", enrollee)}
                    >
                      Documents
                    </button>
                    <button onClick={() => openModal("view", enrollee)}>
                      View
                    </button>
                    <button onClick={() => openModal("edit", enrollee)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(enrollee.id)}>
                      Delete
                    </button>
                    <button onClick={() => approveEnrollee(enrollee.id)}>
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt(
                          "Please enter the reason for rejection:"
                        );
                        if (reason) {
                          rejectEnrollee(enrollee.id, reason);
                        }
                      }}
                    >
                      Reject
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
      {modalType === "viewDocuments" && (
        <div>
          <h3>Uploaded Documents</h3>
          {selectedEnrollee?.documents.length > 0 ? (
            <ul>
              {selectedEnrollee.documents.map((doc, index) => (
                <li key={index}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No documents uploaded.</p>
          )}
        </div>
      )}

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
                  <strong>Name:</strong> {selectedEnrollee?.name}
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
