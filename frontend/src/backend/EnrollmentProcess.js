//EnrollmentProcess.js
import express from 'express';
import db from './Database.js'; 

const router = express.Router();

//enrollment process
router.post('/enroll', async (req, res) => {
  const {
    fullName,
    dob,
    contactNumber,
    email,
    address,
    prevSchoolName,
    prevProgram,
    studentId,
    academicYear,
    program,
  } = req.body;

  try {
    const [result] = await db.promise().query(
      `INSERT INTO enrollments (
        full_name, dob, contactNumber, email, address, prev_school_name, 
        prev_program, student_id, academic_year, program
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        dob,
        contactNumber,
        email,
        address,
        prevSchoolName || null,
        prevProgram || null, 
        studentId || null, 
        academicYear || null, 
        program || null, 
      ]
    );
    
    res.status(200).json({
      message: 'Enrollment submitted successfully!',
      data: result, 
    });
  } catch (error) {
    console.error('Error inserting enrollment data:', error);
    res.status(500).json({ message: 'Failed to submit enrollment data' });
  }
});

//show enrollment form depending on student status
router.post('/enroll-form', async (req, res) => {
  const { email } = req.body; 
  console.log("Email received at EnrollmentProcess.js:", email);

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

});



export default router;
