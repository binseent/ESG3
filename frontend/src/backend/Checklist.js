import express from "express";
import db from "./Database.js";

const router = express.Router();

const getCourseChecklist = (req, res) => {
  const query = `
    SELECT 
      course_code, 
      course_title, 
      credit_lecture_hrs, 
      credit_lab_hrs, 
      contact_lecture_hrs, 
      contact_lab_hrs, 
      pre_requisite, 
      semester_taken, 
      course_category, 
      grade_id 
    FROM course_checklist;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching course checklist:", err);
      return res.status(500).json({ error: "Failed to fetch course checklist" });
    }
    res.json(results);
  });
};

router.get("/course_checklist", getCourseChecklist);

export default router;
