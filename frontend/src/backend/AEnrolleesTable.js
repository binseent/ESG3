import express from 'express';
import db from './Database.js';

const router = express.Router();

// Display Enrolless on table
router.get('/enrollees', (req, res) => {
  const sql = 'SELECT * FROM enrollments';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching enrollees:', err);
      res.status(500).send('Error fetching enrollees.');
      return;
    }
    res.json(results);
  });
});

export default router;