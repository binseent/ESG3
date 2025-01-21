// StudentInfoData.js
import express from "express";
import db from "./Database.js";

const router = express.Router();

// Route to get student information based on email
router.get("/student-info-data", (req, res) => {
  console.log("Email received at StudentInfoData.js:", req.query);
  const { email } = req.query;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  const query = `
    SELECT student_id, firstName, middleName, lastName, email, course, birthday, address, contactNumber 
    FROM students WHERE email = ?
  `;

  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    // Only send one response
    const studentData = result[0];
    console.log("Returning data for user:", studentData);
    return res.status(200).send(studentData);
  });
});

// Route to update student information
router.put("/update-student-info", (req, res) => {

  const { course, birthday, address, contactNumber, email } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  console.log("Received data to update:", req.body); // Log the received data

  const query =
    "UPDATE students SET course = ?, birthday = ?, address = ?, contactNumber = ? WHERE email = ?";
  db.query(query, [course, birthday, address, contactNumber, email], (err) => {

    if (err) {
      console.error("Database update error:", err);
      return res.status(500).send({ message: "Database error", error: err });
    }

    // Send the updated data back to the frontend to confirm the update
    res.status(200).send({
      message: "Student info updated successfully",
      updatedData: { course, address, contactNumber, email },

    });
  });
});

export default router;
