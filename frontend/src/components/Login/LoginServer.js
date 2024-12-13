import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: "Mga lods, kayo nalang mag connect sa database hahaha",
  user: "",     
  password: "",       
  database: "" 
});

app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
  const { studentId, password } = req.body;
  //paki bago nalang yung fields, di ko kasi alam eh
  const query = "SELECT * FROM users WHERE studentId = ? AND password = ?";

  db.query(query, [studentId, password], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Database error" });
      return;
    }

    if (result.length > 0) {
      res.status(200).send({ message: "Login successful" });
    } 
    else {
      res.status(400).send({ message: "Invalid student ID or password" });
    }
  });
});

app.post("/register", (req, res) => {
  const { firstName, middleName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match" });
  }
  else{
    //Ito rin pala paki tapos nalang ng query, di ko kasi alam yung fields ng table natin eh
    const query = "INSERT INTO () VALUES (?, ?, ?, ?, ?)";

    db.query(query, [firstName, middleName, lastName, email, password], (err, result) => {
        if (err) {
        res.status(500).send({ message: "Database error" });
        return;
        }

        res.status(200).send({ message: "Registration successful" });
    });
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
