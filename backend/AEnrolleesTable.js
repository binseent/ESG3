import express from "express";
import db from "./Database.js";

const router = express.Router();

// Display Enrollees on table
router.get("/enrollees-table", (req, res) => {
  const sql = "SELECT * FROM enrollments";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching enrollees:", err);
      return res.status(500).send("Error fetching enrollees.");
    }
    return res.json(results);
  });
});

// View action button
router.get("/enrollees/:id", (req, res) => {
  const sql = "SELECT * FROM enrollments WHERE enrollment_id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error("Error fetching enrollee:", err);
      return res.status(500).send("Error fetching enrollee.");
    }
    return res.json(results[0]); 
  });
});

// Edit Action button
router.put("/enrollees/:id", (req, res) => {
  const { id } = req.params;
  const {
    full_name,
    dob,
    contactNumber,
    email,
    address,
    prev_school_name,
    prev_program,
    academic_year,
    program,
  } = req.body;

  const sql = `
    UPDATE enrollments 
    SET full_name = ?, dob = ?, contactNumber = ?, email = ?, address = ?, 
        prev_school_name = ?, prev_program = ?, academic_year = ?, program = ? 
    WHERE enrollment_id = ?`;

  db.query(sql, [full_name, dob, contactNumber, email, address, prev_school_name, prev_program, academic_year, program, id], (err) => {
    if (err) {
      console.error("Error updating enrollee:", err);
      return res.status(500).send("Error updating enrollee.");
    }
    return res.send("Enrollee updated successfully.");
  });
});

// Approve and Reject
router.patch("/enrollees/status/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = "UPDATE enrollments SET enrollment_status = ? WHERE enrollment_id = ?";
  db.query(sql, [status, id], (err) => {
    if (err) {
      console.error(`Error updating enrollee status to ${status}:`, err);
      return res.status(500).send("Error updating enrollee status.");
    }
    return res.send(`Enrollee status updated to ${status}.`);
  });
});

export default router;
