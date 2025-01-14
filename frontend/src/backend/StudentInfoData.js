// StudentInfoData.js
import express from 'express';
import db from './Database.js';

const router = express.Router();

export const handleStudentInfo = (email, res) => {
  const query = "SELECT firstName, middleName, lastName, email FROM users WHERE email = ?";
  
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

    const { firstName, middleName, lastName, email } = result[0];
    res.status(200).send({ firstName, middleName, lastName, email });
  });
};

router.get('/student-info/:email', (req, res) => {
  const email = req.params.email;
  handleStudentInfo(email, res);
});

export default router;