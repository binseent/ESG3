import React, { useState } from "react";
import "./StudentManageTable.css";

const StudentManageTable = () => {
  const [students, setStudents] = useState([
    {
      id: "202410001",
      name: "John Doe",
      course: "Computer Science",
      year: "1st Year",
      status: "Enrolled",
    },
    {
      id: "202410002",
      name: "Jane Smith",
      course: "Information Technology",
      year: "2nd Year",
      status: "Pending",
    },
    {
      id: "202410003",
      name: "Mike Johnson",
      course: "Engineering",
      year: "3rd Year",
      status: "Enrolled",
    },
    {
      id: "202410004",
      name: "Emily Davis",
      course: "Computer Science",
      year: "4th Year",
      status: "Dropped",
    },
  ]);

  const [searchInput, setSearchInput] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [modalType, setModalType] = useState(""); // 'view', 'add', 'edit'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    course: "",
    year: "",
    status: "",
  });

  // Filtered students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      student.id.toLowerCase().includes(searchInput.toLowerCase()) ||
      student.course.toLowerCase().includes(searchInput.toLowerCase());

    const matchesCourse =
      !filterCourse ||
      student.course.toLowerCase() === filterCourse.toLowerCase();
    const matchesYear =
      !filterYear || student.year.toLowerCase() === filterYear.toLowerCase();
    const matchesStatus =
      !filterStatus ||
      student.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesCourse && matchesYear && matchesStatus;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchInput("");
    setFilterCourse("");
    setFilterYear("");
    setFilterStatus("");
  };

  // Open modal
  const openModal = (type, student = null) => {
    setModalType(type);
    setSelectedStudent(student);
    setNewStudent(
      student || { id: "", name: "", course: "", year: "", status: "" }
    );
  };

  // Close modal
  const closeModal = () => {
    setModalType("");
    setSelectedStudent(null);
    setNewStudent({ id: "", name: "", course: "", year: "", status: "" });
  };

  // Add new student
  const handleAdd = () => {
    setStudents([...students, newStudent]);
    closeModal();
  };

  // Edit student
  const handleEdit = () => {
    setStudents(
      students.map((student) =>
        student.id === selectedStudent.id ? newStudent : student
      )
    );
    closeModal();
  };

  // Delete student
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  return (
    <div className="student-manage-container">
      {/* Search and Filters */}
      <div className="student-manage-search-filter">
        <input
          type="text"
          className="student-manage-search-box"
          placeholder="Search by Name, Student ID, or Course"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select
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
          className="student-manage-filter-dropdown"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="Enrolled">Enrolled</option>
          <option value="Pending">Pending</option>
          <option value="Dropped">Dropped</option>
        </select>
        <button className="student-manage-reset-button" onClick={resetFilters}>
          Reset
        </button>
        <button
          className="student-manage-reset-button"
          onClick={() => openModal("add")}
        >
          Add Student
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
            <th>Actions</th>
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
                <td>
                  <button onClick={() => openModal("view", student)}>
                    View
                  </button>
                  <button onClick={() => openModal("edit", student)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modalType && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              {modalType === "view"
                ? "View Student"
                : modalType === "add"
                ? "Add Student"
                : "Edit Student"}
            </h3>
            <form>
              <label>Student ID:</label>
              <input
                type="text"
                value={newStudent.id}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, id: e.target.value })
                }
                disabled={modalType === "view"}
              />
              <label>Name:</label>
              <input
                type="text"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
                disabled={modalType === "view"}
              />
              <label>Course:</label>
              <input
                type="text"
                value={newStudent.course}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, course: e.target.value })
                }
                disabled={modalType === "view"}
              />
              <label>Year Level:</label>
              <input
                type="text"
                value={newStudent.year}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, year: e.target.value })
                }
                disabled={modalType === "view"}
              />
              <label>Status:</label>
              <input
                type="text"
                value={newStudent.status}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, status: e.target.value })
                }
                disabled={modalType === "view"}
              />
              {modalType === "add" && <button onClick={handleAdd}>Add</button>}
              {modalType === "edit" && (
                <button onClick={handleEdit}>Save</button>
              )}
              <button onClick={closeModal}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManageTable;
