import express from 'express';
import bcrypt from 'bcrypt';
import db from './Database.js';

const router = express.Router();

//-- Login --//
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  const query = "SELECT * FROM students WHERE email = ?";
  db.query(query, [email], async (err, result) => {
    if (err) {
      console.error("Database error:", err); 
      return res.status(500).send({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const students = result[0];
    try {
      const isMatch = await bcrypt.compare(password, students.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Invalid email or password" });
      }


      return res.status(200).send({
        message: "Login successful",
        student: {
          id: students.student_id,
          firstName: students.firstName,
          middleName: students.middleName,
          lastName: students.lastName,
          email: students.email,
        },
      });
    } catch (compareError) {
      console.error("Error comparing passwords:", compareError); 
      return res.status(500).send({ message: "Internal server error" });
    }
  });
});
//-- Login --//

//-- Register --//
router.post("/register", async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    confirmPassword
  } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).send({ message: "All required fields must be filled" });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO students (
        firstName, middleName, lastName, email, password
      ) VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [
        firstName, middleName, lastName, email, hashedPassword,
      ],
      (err, result) => {
        if (err) {
          console.error("Database error:", err); 
          res.status(500).send({ message: "Database error" });
          return;
        }
        res.status(200).send({ message: "Registration successful" });
      }
    );
  } catch (err) {
    console.error("Error hashing password:", err); 
    res.status(500).send({ message: "Internal server error" });
  }
});
//-- Register --//

//-- Password Reset --//
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  const query = "SELECT * FROM students WHERE email = ?";
  
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err); 
      res.status(500).send({ message: "Database error" });
      return;
    }

    if (result.length > 0) {
      const insertQuery = "INSERT INTO password_resets (email) VALUES (?)";
      db.query(insertQuery, [email], (insertErr) => {
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
//-- Password Reset --//

export default router;
