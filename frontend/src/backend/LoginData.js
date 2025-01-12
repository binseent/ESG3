import express from 'express';
import bcrypt from 'bcrypt';
import db from './Database.js';

const router = express.Router();




router.post("/login", (req, res) => {
  const { studentId, password } = req.body;
  const query = "SELECT * FROM users WHERE studentId = ?";
  
  db.query(query, [studentId], async (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send({ message: "Database error" });
      return;
    }

    if (result.length > 0) {
      const validPassword = await bcrypt.compare(password, result[0].password);
      if (validPassword) {
        req.session.studentId = result[0].studentId;
        res.status(200).send({ 
          message: "Login successful",
          studentId: result[0].studentId
        });
      } else {
        res.status(400).send({ message: "Invalid student ID or password" });
      }
    } else {
      res.status(400).send({ message: "Invalid student ID or password" });
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