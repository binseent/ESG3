//EnrollmentProcess.js
import express from "express";
import db from "./Database.js";

const router = express.Router();

//enrollment process
router.post("/enrollees-table", async (req, res) => {
  const {
    enrollment_id,
    student_id,
    course_code,
    enrollment_date,
    full_name,
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
        enrollment_id, student_id, course_code, enrollment_date, full_name, contactNumber, email, address, prev_school_name, 
        prev_program, academic_year, program, enrollment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        enrollment_id || null,
        student_id,
        course_code || null,
        enrollment_date || new Date(), // Default to current date if not provided
        full_name,
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
    return res
      .status(500)
      .json({ message: "Failed to submit enrollment data" });
  }
});

//show enrollment form depending on student status
router.post("/enroll-form", async (req, res) => {
  const { email } = req.body;
  console.log("Email received at EnrollmentProcess.js:", email);

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  const query = `
  SELECT status FROM students WHERE email = ?
`;

  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    const studentStatus = result[0];
    console.log("Students status at enrollment:", studentStatus);
    return res.status(200).send(studentStatus);
  });
});

export default router;
