import React, { useState } from "react";

const Checklist = () => {
  const [semesters, setSemesters] = useState([
    {
      semesterTitle: "First Semester - First Year",
      courses: [
        {
          code: "GNED 02",
          title: "Ethics",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "2.75",
        },
        {
          code: "GNED 05",
          title: "Purposive Communication",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "GNED 11",
          title: "Kontekstwulisadong Komunikasyon sa Filipino",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "COSC 50",
          title: "Discrete Structures I",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "DCIT 21",
          title: "Introduction to Computing",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "DCIT 22",
          title: "Computer Programming I",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "FITT 1",
          title: "Movement Enhancement",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "NSTP 1",
          title: "National Service Training Program 1",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "CvSU 101",
          title: "Institutional Orientation",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
      ],
    },
    {
      semesterTitle: "Second Semester - First Year",
      courses: [
        {
          code: "GNED 01",
          title: "Art Appreciation",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "GNED 03",
          title: "Mathematics in the Modern World",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "GNED 06",
          title: "Science, Technology, and Society",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "GNED 12",
          title: "Dalumat Ng/Sa Filipino",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "DCIT 23",
          title: "Computer Programming II",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "ITEC 50",
          title: "Web Systems and Technologies",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "FITT 2",
          title: "Fitness Exercise",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "NSTP 2",
          title: "National Service Training Program 2",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
      ],
    },
    {
      semesterTitle: "First Semester - Second Year",
      courses: [
        {
          code: "GNED 04",
          title: "Mga babasahin hinggil sa Kasaysayan ng Pilipinas",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "-",
        },
        {
          code: "MATH 1",
          title: "Analytic Geometry",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "-",
        },
        {
          code: "COSC 55",
          title: "Discrete Structures II",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "-",
        },
        {
          code: "COSC 50",
          title: "Discrete Structures I",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "-",
        },
        {
          code: "COSC 60",
          title: "Digital Logic Design",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "-",
        },
        {
          code: "DCIT 50",
          title: "Object Oriented Programming",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "-",
        },
        {
          code: "DCIT 24",
          title: "Information Management",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "-",
        },
        {
          code: "INSY 50",
          title: "Fundamentals of Information Systems",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "-",
        },
        {
          code: "FITT 3",
          title: "Physical Activities towards Health and Fitness 1",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "-",
        },
      ],
    },
    {
      semesterTitle: "Second Semester - Second Year",
      courses: [
        {
          code: "GNED 08",
          title: "Understanding the Self",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "GNED 14",
          title: "Panitikang Panlipunan",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "GNED 03",
          title: "Art Appreciation",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "MATH 2",
          title: "Calculus",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "COSC 65",
          title: "Architecture and Organization",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "COSC 70",
          title: "Software Engineering I",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "DCIT 25",
          title: "Data Structures and Algorithms",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "DCIT 55",
          title: "Advanced Database Management System",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "FITT 4",
          title: "Physical Activities towards Health and Fitness 2",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
      ],
    },
    {
      semesterTitle: "First Semester - Third Year",
      courses: [
        {
          code: "MATH 3",
          title: "Linear Algebra",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "2.75",
        },
        {
          code: "COSC 75",
          title: "Software Engineering II",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "COSC 80",
          title: "Operating Systems",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "COSC 85",
          title: "Networks and Communication",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "COSC 101",
          title: "CS Elective 1",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "DCIT 26",
          title: "Application Dev't and Emerging Technologies",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "DCIT 26",
          title: "Social and Professional Issues",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
      ],
    },
    {
      semesterTitle: "Second Semester - Third Year",
      courses: [
        {
          code: "GNED 09",
          title: "Life and Works of Rizal",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "MATH 4",
          title: "Experimental Statistics",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "COSC 90",
          title: "Design and Analysis of Algorithm",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "COSC 95",
          title: "Programming Languages",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "COSC 106",
          title: "CS Elective 2",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "DCIT 60",
          title: "Methods of Research",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "ITEC 85",
          title: "Information Assurance and Security",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
      ],
    },
    {
      semesterTitle: "Mid Year",
      courses: [
        {
          code: "COSC 199",
          title: "Practicum (240 hours)",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "-",
        },
      ],
    },
    {
      semesterTitle: "First Semester - Fourth Year",
      courses: [
        {
          code: "ITEC 80",
          title: "Human Computer Interaction",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "2.75",
        },
        {
          code: "COSC 100",
          title: "Automata Theory and Formal Languages",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "COSC 105",
          title: "Intelligent Systems",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "COSC 111",
          title: "CS Elective 3",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
        {
          code: "COSC 200A",
          title: "Undergraduate Thesis I",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "1",
          finalGrade: "1.25",
        },
      ],
    },
    {
      semesterTitle: "Second Semester - Fourth Year",
      courses: [
        {
          code: "GNED 07",
          title: "The Contemporary World",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "GNED 10",
          title: "Gender and Society",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "COSC 110",
          title: "Numerical and Symbolic Computation",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
        {
          code: "COSC 200B",
          title: "Undergraduate Thesis II",
          creditUnit: "3",
          contactHrs: "3",
          preRequisite: "-",
          semesterTaken: "2",
          finalGrade: "-",
        },
      ],
    },
  ]);

  const [editingCourse, setEditingCourse] = useState(null);
  const [newGrade, setNewGrade] = useState("");

  // Handle edit click
  const handleEditClick = (course) => {
    setEditingCourse(course);
    setNewGrade(course.finalGrade);
  };

  // Handle grade update
  const handleUpdateGrade = (semesterIndex, courseIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses[courseIndex].finalGrade = newGrade;
    setSemesters(updatedSemesters);
    setEditingCourse(null);
  };

  // Handle delete grade
  const handleDeleteGrade = (semesterIndex, courseIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses[courseIndex].finalGrade = "-";
    setSemesters(updatedSemesters);
  };

  return (
    <div className="checklist">
      <div className="heading">
        <h3>Bachelor of Science in Computer Science</h3>
      </div>
      <div className="course-table">
        {semesters.map((semester, semesterIndex) => (
          <div key={semesterIndex} className="semester-section">
            <h4>{semester.semesterTitle}</h4>
            <table>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Credit Unit</th>
                  <th>Contact Hrs.</th>
                  <th>Pre-Requisite</th>
                  <th>Semester Taken</th>
                  <th>Final Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {semester.courses.map((course, courseIndex) => (
                  <tr key={courseIndex}>
                    <td>{course.code}</td>
                    <td>{course.title}</td>
                    <td>{course.creditUnit}</td>
                    <td>{course.contactHrs}</td>
                    <td>{course.preRequisite}</td>
                    <td>{course.semesterTaken}</td>
                    <td>
                      {editingCourse === course ? (
                        <input
                          type="text"
                          value={newGrade}
                          onChange={(e) => setNewGrade(e.target.value)}
                        />
                      ) : (
                        course.finalGrade
                      )}
                    </td>
                    <td>
                      {editingCourse === course ? (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateGrade(semesterIndex, courseIndex)
                            }
                          >
                            Save
                          </button>
                          <button onClick={() => setEditingCourse(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEditClick(course)}>
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteGrade(semesterIndex, courseIndex)
                            }
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
