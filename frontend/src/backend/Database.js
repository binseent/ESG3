import mysql from 'mysql2';

const db = mysql.createConnection({
  host: "127.0.0.1", 
  user: "root", 
  password: "Raysan091021",
  database: "checklist-1"
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