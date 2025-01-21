import React, { useState, useEffect } from "react";
import axios from "axios";

const Checklist = () => {
  const [courses, setCourses] = useState([]); // Store courses
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [search, setSearch] = useState(""); // Search input
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced search term
  const [studentCourse, setStudentCourse] = useState(""); // Student's course title
  const [editGrade, setEditGrade] = useState(""); // Store grade being edited
  const [editCourseCode, setEditCourseCode] = useState(""); // Store course code being edited
  const [showEditModal, setShowEditModal] = useState(false); // Control modal visibility

  // Debounce function to delay search requests
  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearch(search); // Update the debounced search term
    }, 300);

    return () => clearTimeout(debounce);
  }, [search]);

  // Fetch course checklist when the component is mounted and whenever search changes
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/api/course_checklist${
          debouncedSearch ? `?search=${debouncedSearch}` : ""
        }`;
        const response = await axios.get(url);
        setCourses(response.data);
        setError(null);

        // Update student course based on the first item in the response
        if (response.data.length > 0) {
          setStudentCourse(response.data[0].student_course || ""); // Use a fallback if student_course is undefined
        } else {
          setStudentCourse(""); // Reset course title if no data
        }
      } catch (err) {
        console.error("Error fetching course checklist:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch]);

  // Function to handle editing final grade
  const handleEditGrade = (courseCode) => {
    const course = courses.find((c) => c.course_code === courseCode);
    setEditGrade(course.final_grade || ""); // Set the current grade
    setEditCourseCode(courseCode); // Set the current course code
    setShowEditModal(true); // Show the modal
  };

  // Function to save the edited grade
  const saveGrade = async () => {
    if (!editGrade.trim()) {
      setError("Grade cannot be empty.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/course_checklist/${editCourseCode}`,
        { final_grade: editGrade }
      );
      console.log("Grade updated successfully:", response.data);

      // Update the courses in the frontend
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.course_code === editCourseCode
            ? { ...course, final_grade: editGrade }
            : course
        )
      );
      setShowEditModal(false); // Close the modal
      setEditGrade(""); // Reset grade field
      setEditCourseCode(""); // Reset course code
      setError(null); // Clear any errors
    } catch (err) {
      console.error("Error updating grade:", err.response?.data || err);
      setError("Failed to update grade. Please try again.");
    }
  };

  // Function to handle deleting a grade
  const handleDeleteGrade = async (courseCode) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/course_checklist/${courseCode}`
      );
      console.log("Grade deleted successfully:", response.data);

      // Remove the course from the courses state
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.course_code === courseCode
            ? { ...course, final_grade: "N/A" }
            : course
        )
      );
      setError(null); // Clear any errors
    } catch (err) {
      console.error("Error deleting grade:", err);
      setError("Failed to delete grade. Please try again later.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="checklist">
      {/* Dynamic Title */}
      <h2>
        {studentCourse
          ? `${studentCourse} Course Checklist`
          : "Course Checklist"}
      </h2>

      {/* Search bar */}
      <div className="search">
        <label htmlFor="search">Search by Student ID or Name: </label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter student ID or name"
        />
      </div>

      {/* Display course checklist */}
      {courses.length === 0 ? (
        <p>No student or course found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Credit Lecture Hrs</th>
              <th>Credit Lab Hrs</th>
              <th>Contact Lecture Hrs</th>
              <th>Contact Lab Hrs</th>
              <th>Pre-requisite</th>
              <th>Semester Taken</th>
              <th>Final Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.course_code}>
                <td>{course.course_code}</td>
                <td>{course.course_title}</td>
                <td>{course.credit_lecture_hrs}</td>
                <td>{course.credit_lab_hrs}</td>
                <td>{course.contact_lecture_hrs}</td>
                <td>{course.contact_lab_hrs}</td>
                <td>{course.pre_requisite}</td>
                <td>{course.semester_taken}</td>
                <td>{course.final_grade || "N/A"}</td>
                <td>
                  <button onClick={() => handleEditGrade(course.course_code)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteGrade(course.course_code)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Grade Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Final Grade</h3>
            <input
              type="text"
              value={editGrade}
              onChange={(e) => setEditGrade(e.target.value)}
              placeholder="Enter new grade"
            />
            <button onClick={saveGrade}>Save</button>
            <button
              onClick={() => {
                setShowEditModal(false);
                setEditGrade("");
                setEditCourseCode("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checklist;
