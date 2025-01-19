// StudentInfoData.js
import express from 'express';
import db from './Database.js';

const router = express.Router();

// Route to get student information based on email
router.get('/student-info-data', (req, res) => {
  console.log("Query Parameters:", req.query);
  const { email } = req.query;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  const query = "SELECT firstName, middleName, lastName, email, course, birthday, address, contact_number FROM students WHERE email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    const { firstName, middleName, lastName, email, course, birthday, address, contact_number } = result[0];
    console.log("Returning data for user:", firstName, middleName, lastName, email);
    res.status(200).send({ firstName, middleName, lastName, email, course, birthday, address, contact_number });
  });
});

// Route to update student information
router.put('/update-student-info', (req, res) => {
  const { course, birthday, address, contact_number, email } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }
  if (!course || !birthday || !address || !contact_number) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const query = "UPDATE students SET course = ?, birthday = ?, address = ?, contact_number = ? WHERE email = ?";
  db.query(query, [course, birthday, address, contact_number, email], (err) => {
    if (err) {
      console.error("Database update error:", err);
      return res.status(500).send({ message: "Database error", error: err });
    }
    res.status(200).send({ message: "Student info updated successfully" });
  });
});






export default router;
