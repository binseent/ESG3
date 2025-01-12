import express from 'express';
import bcrypt from 'bcrypt';
import axios from 'axios';
import db from './Database.js';

const router = express.Router();

//-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --//
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send({ message: "Database error" });
      return;
    }

    if (result.length === 0) {
      res.status(400).send({ message: "Invalid email or password" });
      return;
    }

    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).send({ message: "Invalid email or password" });
      return;
    }

    // Send email to StudentInfoData.js
    try {
      await axios.post('http://localhost:3000/student-info', { email });
      res.status(200).send({ message: "Login successful" });
    } catch (error) {
      console.error("Error sending email to StudentInfoData:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  });
});
//-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --//

//-- Register --// //-- Register --////-- Register --////-- Register --////-- Register --////-- Register --////-- Register --//
router.post("/register", async (req, res) => {
  const { firstName, middleName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = "INSERT INTO users (firstName, middleName, lastName, email, password) VALUES (?, ?, ?, ?, ?)";
  
  db.query(query, [firstName, middleName, lastName, email, hashedPassword], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send({ message: "Database error" });
      return;
    }

    res.status(200).send({ message: "Registration successful" });
  });
});
//-- Register --////-- Register --////-- Register --////-- Register --////-- Register --////-- Register --////-- Register --////-- Register --//

//-- Password Reset --////-- Password Reset --////-- Password Reset --////-- Password Reset --////-- Password Reset --////-- Password Reset --//
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send({ message: "Database error" });
      return;
    }

    if (result.length > 0) {
      const insertQuery = "INSERT INTO password_resets (email) VALUES (?)";
      db.query(insertQuery, [email], (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Database error:", insertErr);
          res.status(500).send({ message: "Database error" });
          return;
        }
        res.status(200).send({ message: "Password reset request sent to admin!" });
      });
    } else {
      res.status(400).send({ message: "Email not found" });
    }
  });
});
//-- Password Reset --////-- Password Reset --////-- Password Reset --////-- Password Reset --////-- Password Reset --////-- Password Reset --//

export default router;