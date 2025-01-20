// StudentInfoData.js
import express from "express";
import db from "./Database.js";

const router = express.Router();

// Route to get student information based on email
router.get("/student-info-data", (req, res) => {
  console.log("Query Parameters:", req.query);
  const { email } = req.query;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  const query =
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    "SELECT student_id, firstName, middleName, lastName, email, course, birthday, address, contactNumber FROM students WHERE email = ?";
=======
    "SELECT firstName, middleName, lastName, email, course, address, contact_number FROM students WHERE email = ?";
>>>>>>> Stashed changes
=======
    "SELECT firstName, middleName, lastName, email, course, address, contact_number FROM students WHERE email = ?";
>>>>>>> Stashed changes
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
    const studentData = result[0];
    console.log("Returning data for user:", studentData);
    res.status(200).send(studentData);
=======
=======
>>>>>>> Stashed changes
    const {
      firstName,
      middleName,
      lastName,
      email,
      course,

      address,
      contact_number,
    } = result[0];
    console.log(
      "Returning data for user:",
      firstName,
      middleName,
      lastName,
      email
    );
    res.status(200).send({
      firstName,
      middleName,
      lastName,
      email,
      course,

      address,
      contact_number,
    });
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  });
});

// Route to update student information
router.put("/update-student-info", (req, res) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const { course, birthday, address, contactNumber, email } = req.body;
=======
  const { course, address, contact_number, email } = req.body;
>>>>>>> Stashed changes
=======
  const { course, address, contact_number, email } = req.body;
>>>>>>> Stashed changes

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  console.log("Received data to update:", req.body); // Log the received data

  const query =
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    "UPDATE students SET course = ?, birthday = ?, address = ?, contactNumber = ? WHERE email = ?";
  db.query(query, [course, birthday, address, contactNumber, email], (err) => {
=======
    "UPDATE students SET course = ?, address = ?, contact_number = ? WHERE email = ?";
  db.query(query, [course, address, contact_number, email], (err) => {
>>>>>>> Stashed changes
=======
    "UPDATE students SET course = ?, address = ?, contact_number = ? WHERE email = ?";
  db.query(query, [course, address, contact_number, email], (err) => {
>>>>>>> Stashed changes
    if (err) {
      console.error("Database update error:", err);
      return res.status(500).send({ message: "Database error", error: err });
    }

    // Send the updated data back to the frontend to confirm the update
    res.status(200).send({
      message: "Student info updated successfully",
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      updatedData: { course, address, contactNumber, email },
=======
      updatedData: { course, address, contact_number, email },
>>>>>>> Stashed changes
=======
      updatedData: { course, address, contact_number, email },
>>>>>>> Stashed changes
    });
  });
});

export default router;
