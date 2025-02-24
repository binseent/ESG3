//StudentManageData.js
import express from 'express';
import db from './Database.js';

const router = express.Router();

//-- Select Students --//
router.get('/students', (req, res) => {
  const query = 'SELECT * FROM students';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch students' });
    }
    res.json(results);
  });
});

//-- Add new Students --//
router.post('/students-add', async (req, res) => {
  const { student_id, firstName, MiddleName, lastName, email, password, age, birthday, address, contactNumber, status, course } = req.body;
  try {
    await db.query(
      'INSERT INTO students (student_id, firstName, MiddleName, lastName, email, password, age, birthday, address, contactNumber, status, course) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [student_id, firstName, MiddleName, lastName, email, password, age, birthday, address, contactNumber, status, course]
    );
    res.json({ message: 'Student added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add student.' });
  }
});

//-- Update Student Data --//
router.put('/students-update/:id', async (req, res) => {
  const { id } = req.params;
  const { student_id, firstName, MiddleName, lastName, email, password, age, birthday, address, contactNumber, status, course } = req.body;
  try {
    await db.query(
      'UPDATE students SET student_id = ?, firstName = ?, MiddleName = ?, lastName = ?, email = ?, password = ?, age = ?, birthday = ?, address = ?, contactNumber = ?, status = ?, course = ? WHERE id = ?',
      [student_id, firstName, MiddleName, lastName, email, password, age, birthday, address, contactNumber, status, course, id]
    );
    res.json({ message: 'Student updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update student.' });
  }
});

//-- Delete Students --//
router.delete('/students-delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM students WHERE id = ?', [id]);
    res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete student.' });
  }
});

export default router;