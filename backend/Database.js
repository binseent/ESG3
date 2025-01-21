//Database.js
import mysql from "mysql2";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pemPath = path.resolve(__dirname, "./isrgrootx1.pem");

const db = mysql.createConnection({
  host: "gateway01.us-east-1.prod.aws.tidbcloud.com",
  user: "qMiYMLDDRvmBUQU.root",
  password: "gD7r7hnIb5oFcjET",
  database: "enrollment_system",
  port: 4000,
  ssl: {
    ca: fs.readFileSync(pemPath),
  },
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

export default db;
