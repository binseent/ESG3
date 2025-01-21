//AEnrolleesTable.js
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

export default router;
