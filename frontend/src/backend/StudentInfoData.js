// StudentInfoData.js
import express from 'express';
import db from './Database.js';

const router = express.Router();

router.get('/student-info-data', (req, res) => {
  console.log("Query Parameters:", req.query);
  const { email } = req.query;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  const query = "SELECT firstName, middleName, lastName, email FROM users WHERE email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    const { firstName, middleName, lastName } = result[0];
    console.log("New user log in: ",firstName, middleName, lastName, email)
    res.status(200).send({ firstName, middleName, lastName,});
  });
});

export default router;

