import express from 'express';
import mysql from 'mysql2';

const router = express.Router();

const db = mysql.createConnection({
  host: "127.0.0.1", 
  user: "root", 
  password: "",
  database: "checklist-1"
});

//-- Login --//  //-- Login --// //-- Login --//  //-- Login --// //-- Login --//  //-- Login --// //-- Login --//  //-- Login --//
router.post("/login", (req, res) => {
  const { studentId, password } = req.body;
  const query = "SELECT * FROM users WHERE studentId = ? AND password = ?";
  
  db.query(query, [studentId, password], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Database error" });
      return;
    }

    if (result.length > 0) {
      // Store studentId in localStorage
      localStorage.setItem("studentId", result[0].studentId);
      res.status(200).send({ 
        message: "Login successful",
        studentId: result[0].studentId
      });
    } else {
      res.status(400).send({ message: "Invalid student ID or password" });
    }
  });
});
//-- Login --//  //-- Login --// //-- Login --//  //-- Login --// //-- Login --//  //-- Login --// //-- Login --//  //-- Login --//

//-- Register --// //-- Register --// //-- Register --// //-- Register --// //-- Register --// //-- Register --// //-- Register --//
router.post("/register", (req, res) => {
  const { firstName, middleName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  const query = "INSERT INTO users (firstName, middleName, lastName, email, password) VALUES (?, ?, ?, ?, ?)";
  
  db.query(query, [firstName, middleName, lastName, email, password], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Database error" });
      return;
    }

    res.status(200).send({ message: "Registration successful" });
  });
});
//-- Register --// //-- Register --// //-- Register --// //-- Register --// //-- Register --// //-- Register --// //-- Register --//

//-- Password Reset --// //-- Password Reset --// //-- Password Reset --// //-- Password Reset --// //-- Password Reset --// 
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  
  db.query(query, [email], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Database error" });
      return;
    }

    if (result.length > 0) {
      const insertQuery = "INSERT INTO password_resets (email) VALUES (?)";
      db.query(insertQuery, [email], (insertErr, insertResult) => {
        if (insertErr) {
          res.status(500).send({ message: "Database error" });
          return;
        }

        // Here you would send the email for password reset
        res.status(200).send({ message: "Password reset request sent to admin!" });
      });
    } else {
      res.status(400).send({ message: "Email not found" });
    }
  });
});
//-- Password Reset --// //-- Password Reset --// //-- Password Reset --// //-- Password Reset --// //-- Password Reset --// 

export default router;
