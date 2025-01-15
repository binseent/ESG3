//Database.js
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: "localhost", 
  user: "root", 
  password: 'estr301502aug!#2121',
  database: "checklist-1",
  port: 3307
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

export default db;