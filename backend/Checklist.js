import express from "express";
import db from "./Database.js";

const router = express.Router();

// Fetch all course checklist data or filter by search
router.get("/course_checklist", (req, res) => {
  const search = req.query.search || '';
  const searchTerm = `%${search}%`;
  const params = [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm];

  const query = `
    SELECT 
      course_checklist.course_code,
      course_checklist.course_title,
      course_checklist.credit_lecture_hrs,
      course_checklist.credit_lab_hrs,
      course_checklist.contact_lecture_hrs,
      course_checklist.contact_lab_hrs,
      course_checklist.pre_requisite,
      course_checklist.semester_taken,
      final_grade.student_id,
      final_grade.final_grade,
      students.firstName,
      students.middleName,
      students.lastName,
      students.course AS student_course
    FROM course_checklist
    LEFT JOIN final_grade ON final_grade.course_code = course_checklist.course_code
    LEFT JOIN students ON students.student_id = final_grade.student_id
    WHERE 
      final_grade.student_id LIKE ? OR
      students.student_id LIKE ? OR 
      students.firstName LIKE ? OR
      students.middleName LIKE ? OR
      students.lastName LIKE ?
  `;

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching course checklist:", err);
      return res.status(500).json({ error: "Failed to fetch course checklist" });
    }

    // Add "N/A" for missing final grades
    const modifiedResults = results.map((course) => ({
      ...course,
      final_grade: course.final_grade || "N/A",
    }));

    res.json(modifiedResults);
  });
});


// PUT endpoint to update the final grade
router.put("/course_checklist/:course_code", (req, res) => {
  const { course_code } = req.params; // Extract course_code from the URL
  const { student_id, final_grade } = req.body; // Extract student_id and final_grade from the request body

  // Validate required fields
  if (!course_code || !student_id || final_grade === undefined) {
    return res.status(400).send({
      message: "Course code, student ID, and final grade are required",
    });
  }

  console.log("Updating grade for course:", course_code, "for student:", student_id, "with grade:", final_grade);

  // Query to update the final grade in the `final_grade` table
  const query = `
    UPDATE final_grade
    SET final_grade = ?
    WHERE course_code = ? AND student_id = ?;
  `;
  const params = [final_grade, course_code, student_id];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error updating final grade:", err);
      return res.status(500).json({ error: "Failed to update final grade" });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ message: "Student or course not found in the final_grade table" });
    }

    res.send({ message: "Final grade updated successfully" });
  });
});

// DELETE endpoint to delete the final grade for a course
router.delete("/course_checklist/:course_code", (req, res) => {
  const { course_code } = req.params; // Extract course_code from the URL
  const { student_id } = req.body; // Extract student_id from the request body

  // Validate required fields
  if (!course_code || !student_id) {
    return res
      .status(400)
      .send({ message: "Course code and student ID are required" });
  }

  console.log("Deleting grade for course:", course_code, "for student:", student_id);

  // Query to set the final grade to NULL in the `final_grade` table
  const query = `
    UPDATE final_grade
    SET final_grade = NULL
    WHERE course_code = ? AND student_id = ?;
  `;
  const params = [course_code, student_id];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error deleting final grade:", err);
      return res.status(500).send({ message: "Failed to delete grade", error: err });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ message: "Student or course not found in the final_grade table" });
    }

    res.send({ message: "Final grade deleted successfully" });
  });
});

export default router;
