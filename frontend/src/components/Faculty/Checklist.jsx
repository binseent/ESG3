import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Checklist = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [studentCourse, setStudentCourse] = useState("");
  const [editGrade, setEditGrade] = useState("");
  const [editCourseCode, setEditCourseCode] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => setDebouncedSearch(search), 600);
    return () => clearTimeout(debounce);
  }, [search]);

  // Fetch data based on debounced search term
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/course_checklist",
          {
            params: { search: debouncedSearch },
          }
        );
        console.log("API response:", response.data); // Debugging line to inspect the response

        if (response.data.length > 0) {
          setCourses(response.data);
          setStudentCourse(response.data[0]?.student_course || "");
          setStudentId(response.data[0]?.student_id);
        } else {
          setCourses([]);
          setError("No courses found for the given search.");
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching course checklist:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch]);

  // Handle editing grade for a course
  const handleEditGrade = (courseCode) => {
    const course = courses.find((course) => course.course_code === courseCode);
    setEditCourseCode(course.course_code);
    setEditGrade(course.final_grade);
    setShowEditModal(true);
  };

  // Save the edited grade
  const saveGrade = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/course_checklist/${editCourseCode}`,
        { student_id: studentId, final_grade: editGrade } // Make sure `studentId` is set
      );
      setShowEditModal(false);
      // Optionally, you may want to refresh the courses list to reflect the updated grade
    } catch (error) {
      console.error("Error saving grade:", error);
    }
  };

  // Handle deleting grade for a course
  const handleDeleteGrade = async (courseCode) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/course_checklist/${courseCode}`,
        { data: { student_id: studentId } } // Send the student_id as part of the request body
      );
      // Optionally, refresh the course list after deletion
    } catch (error) {
      console.error("Error deleting grade:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="checklist">
      <h2>
        {studentCourse
          ? `${studentCourse} Course Checklist`
          : "Course Checklist"}
      </h2>
      <div className="search">
        <label htmlFor="search">Search by Student ID or Name:</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter student ID or name"
        />
      </div>
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
            {courses.map((course, index) => (
              <tr key={`${course.course_code}-${index}`}>
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
            <button onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checklist;
