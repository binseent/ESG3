//StudentManageData.js
import express from 'express';
import db from './Database.js';

const router = express.Router();

//-- Select Students --// //-- Select Students --// //-- Select Students --// //-- Select Students --// //-- Select Students --//
router.get('/students', (req, res) => {
  const query = 'SELECT * FROM students';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch students' });
    }
    res.json(results);
  });
});
//-- Select Students --// //-- Select Students --// //-- Select Students --// //-- Select Students --// //-- Select Students --//

//-- Add new Students --// //-- Add new Students --// //-- Add new Students --// //-- Add new Students --// 
router.post('/students-add', async (req, res) => {
  const { first_name, last_name, email, password, date_of_birth, phone_number } = req.body;
  try {
    await db.query(
      'INSERT INTO students (first_name, last_name, email, password, date_of_birth, phone_number) VALUES (?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, password, date_of_birth, phone_number]
    );
    res.json({ message: 'Student added successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add student.' });
  }
});
//-- Add new Students --// //-- Add new Students --// //-- Add new Students --// //-- Add new Students --// 

//-- Update Student Data --// //-- Update Student Data --// //-- Update Student Data --// //-- Update Student Data --//
router.put('/students-update/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, password, date_of_birth, phone_number } = req.body;
  try {
    await db.query(
      'UPDATE students SET first_name = ?, last_name = ?, email = ?, password = ?, date_of_birth = ?,phone_number = ? WHERE student_id = ?',
      [first_name, last_name, email, password, date_of_birth, phone_number, id]
    );
    res.json({ message: 'Student updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student.' });
  }
});
//-- Update Student Data --// //-- Update Student Data --// //-- Update Student Data --// //-- Update Student Data --//

//-- Delete Students --// //-- Delete Students --// //-- Delete Students --// //-- Delete Students --// 
router.delete('/students-delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM students WHERE student_id = ?', [id]);
    res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student.' });
  }
});
//-- Delete Students --// //-- Delete Students --// //-- Delete Students --// //-- Delete Students --// 
export default router;
