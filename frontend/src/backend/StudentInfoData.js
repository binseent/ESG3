import express from 'express';
import db from './Database.js';

const router = express.Router();

router.post("/student-info", (req, res) => {
  const { email } = req.body;
  const query = "SELECT firstName, middleName, lastName FROM users WHERE email = ?";

  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send({ message: "Database error" });
      return;
    }

    if (result.length === 0) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const { firstName, middleName, lastName } = result[0];
    res.status(200).send({ firstName, middleName, lastName, email });
  });
});

export default router;