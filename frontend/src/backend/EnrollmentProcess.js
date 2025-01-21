//EnrollmentProcess.jsx
import express from "express";
import db from "./Database.js";

const router = express.Router();

router.post("/enrollees-table", async (req, res) => {
  const {
    enrollment_id,
    student_id,
    course_code,
    enrollment_date,
    full_name,
    dob,
    contactNumber,
    email,
    address,
    prev_school_name,
    prev_program,
    academic_year,
    program,
    enrollment_status,
  } = req.body;

  try {
    const [result] = await db.promise().query(
      `INSERT INTO enrollments (
        enrollment_id, student_id, course_code, enrollment_date, full_name, dob, contactNumber, email, address, prev_school_name, 
        prev_program, academic_year, program, enrollment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        enrollment_id || null,
        student_id,
        course_code || null,
        enrollment_date || new Date(), // Default to current date if not provided
        full_name,
        dob,
        contactNumber,
        email,
        address,
        prev_school_name,
        prev_program,
        academic_year,
        program,
        enrollment_status,
      ]
    );

    return res.status(200).json({
      message: "Enrollment submitted successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Error inserting enrollment data:", error);
    return res.status(500).json({ message: "Failed to submit enrollment data" });
  }
});

router.get("/enrollees-table", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM enrollments");
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching enrollees:", error);
    return res.status(500).json({ message: "Failed to fetch enrollees" });
  }
});

export default router;
