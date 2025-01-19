import React, { useState, useEffect } from "react";
import axios from "axios";

const Checklist = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("IT");

  useEffect(() => {
    // Fetch course checklist data
    axios
      .get("http://localhost:3000/api/course_checklist")
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course checklist:", error);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Filter courses based on the selected category (IT or CS includes Both)
  const filteredCourses = courses.filter((course) => {
    return (
      course.course_category === filter || course.course_category === "Both"
    );
  });

  // Dynamic title based on the selected filter
  const title =
    filter === "IT"
      ? "Bachelor of Science in Information Technology"
      : "Bachelor of Science in Computer Science";

  return (
    <div className="checklist">
      <h2>{title}</h2>

      {/* Filter Select */}
      <div className="filter">
        <label htmlFor="filter">Filter by Course Category: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="IT">IT</option>
          <option value="CS">CS</option>
        </select>
      </div>

      {/* Display Table */}
      {filteredCourses.length > 0 ? (
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
              <th>Course Category</th>
              <th>Final Grade</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.course_code}>
                <td>{course.course_code}</td>
                <td>{course.course_title}</td>
                <td>{course.credit_lecture_hrs}</td>
                <td>{course.credit_lab_hrs}</td>
                <td>{course.contact_lecture_hrs}</td>
                <td>{course.contact_lab_hrs}</td>
                <td>{course.pre_requisite}</td>
                <td>{course.semester_taken}</td>
                <td>{course.course_category}</td>
                <td>{course.grade_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
};

export default Checklist;
