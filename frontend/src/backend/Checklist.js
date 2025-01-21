import express from "express";
import db from "./Database.js";

const router = express.Router();

// Fetch all course checklist data or filter by search
router.get("/course_checklist", (req, res) => {
  const { search } = req.query;

  let query = `
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
          final_grade.final_grade
      FROM course_checklist
      LEFT JOIN final_grade ON final_grade.course_code = course_checklist.course_code
  `;

  // Add search condition if the search parameter is provided
  if (search) {
    query += `
        WHERE 
            final_grade.student_id LIKE ? OR
            final_grade.student_id IN (
                SELECT student_id
                FROM students
                WHERE 
                    firstName LIKE ? OR 
                    MiddleName LIKE ? OR 
                    lastName LIKE ?
            )
    `;
  }

  const searchTerm = search ? `%${search}%` : null;

  db.query(
    query,
    search ? [searchTerm, searchTerm, searchTerm, searchTerm] : [],
    (err, results) => {
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
    }
  );
});

// PUT endpoint to update the final grade
router.put("/course_checklist/:course_code", (req, res) => {
  const { course_code } = req.params; // Extract course_code from URL
  const { final_grade } = req.body; // Extract final_grade from the request body

  if (!course_code || final_grade === undefined) {
    return res
      .status(400)
      .send({ message: "Course code and final grade are required" });
  }

  console.log("Updating grade for:", course_code, "with grade:", final_grade);

  const query = "UPDATE course_checklist SET final_grade = ? WHERE course_code = ?";
  db.query(query, [final_grade, course_code], (err, result) => {
    if (err) {
      console.error("Error updating grade:", err);
      return res.status(500).send({ message: "Failed to update grade", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Course not found" });
    }

    console.log("Grade updated successfully");
    return res.status(200).send({ message: "Grade updated successfully" });
  });
});



// DELETE endpoint to delete the final grade for a course
router.delete("/course_checklist/:course_code", (req, res) => {
  const { course_code } = req.params; // Extract course_code from URL

  if (!course_code) {
    return res.status(400).send({ message: "Course code is required" });
  }

  console.log("Deleting grade for course:", course_code);

  // Instead of removing the row, set the grade to 'N/A' or NULL
  const query = "UPDATE course_checklist SET final_grade = 'N/A' WHERE course_code = ?";
  db.query(query, [course_code], (err, result) => {
    if (err) {
      console.error("Error deleting grade:", err);
      return res.status(500).send({ message: "Failed to delete grade", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Course not found" });
    }

    console.log("Grade deleted successfully");
    return res.status(200).send({ message: "Grade deleted successfully" });
  });
});



export default router;
