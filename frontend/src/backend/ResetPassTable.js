import express from 'express';
import db from './Database.js';

const router = express.Router();

router.get('/password-reset-requests', (req, res) => {
    const query = 'SELECT * FROM PasswordResetRequests';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

export default router;