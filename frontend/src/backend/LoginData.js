//LoginData.js
import express from 'express';
import bcrypt from 'bcrypt';
import db from './Database.js';
import { handleStudentInfo } from './StudentInfoData.js';

const router = express.Router();

//-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --// //-- Login --//
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  try {
    const [result] = await db.promise().query(query, [email]);

    if (result.length === 0) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    handleStudentInfo(email, res);
  } catch (dbError) {
    console.error("Database error:", dbError);
    return res.status(500).send({ message: "Database error" });
  }
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