import express from 'express';
import bcrypt from 'bcrypt';
import db from './Database.js';

const router = express.Router();

//-- Login Route --//
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  // Admin login check
  if (email === 'admin@example.com' && password === 'admin') {
    return res.status(200).send({
      message: 'Admin login successful',
      admin: {
        email: 'admin@example.com',
      },
    });
  }

  // Student login check
  const query = 'SELECT * FROM students WHERE email = ?';
  db.query(query, [email], async (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const student = result[0];
    try {
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(400).send({ message: 'Invalid email or password' });
      }

      return res.status(200).send({
        message: 'Login successful',
        student: {
          id: student.student_id,
          firstName: student.firstName,
          middleName: student.middleName,
          lastName: student.lastName,
          email: student.email,
          status: student.status,
        },
      });
    } catch (compareError) {
      console.error('Error comparing passwords:', compareError);
      return res.status(500).send({ message: 'Internal server error' });
    }
  });
});

//-- Register Route --//
router.post('/register', async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    confirmPassword,
    age,
    birthday,
    address,
    contactNumber,
    status,
    course,
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).send({ message: 'All required fields must be filled' });
  }

  // Validate password match
  if (password !== confirmPassword) {
    return res.status(400).send({ message: 'Passwords do not match' });
  }

  try {
    // Check if email already exists
    const checkQuery = 'SELECT * FROM students WHERE email = ?';
    db.query(checkQuery, [email], async (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send({ message: 'Database error' });
      }

      if (result.length > 0) {
        return res.status(400).send({ message: 'Email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user
      const insertQuery = `
        INSERT INTO students (
          firstName, middleName, lastName, email, password, age, birthday, address, contactNumber, status, course
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [
          firstName,
          middleName || null,
          lastName,
          email,
          hashedPassword,
          age,
          birthday,
          address || null,
          contactNumber || null,
          status,
          course,
        ],
        (err, result) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ message: 'Database error' });
          }
          res.status(200).send({ message: 'Registration successful' });
        }
      );
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

//-- Password Reset Route --//
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }

  const query = 'SELECT * FROM students WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).send({ message: 'Database error' });
      return;
    }

    if (result.length > 0) {
      const insertQuery = 'INSERT INTO password_resets (email) VALUES (?)';
      db.query(insertQuery, [email], (insertErr) => {
        if (insertErr) {
          console.error('Database error:', insertErr);
          res.status(500).send({ message: 'Database error' });
          return;
        }
        res.status(200).send({ message: 'Password reset request sent to admin!' });
      });
    } else {
      res.status(400).send({ message: 'Email not found' });
    }
  });
});

export default router;
