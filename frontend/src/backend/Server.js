import express from 'express';
const app = express();
import bodyParser from 'body-parser';
app.use(bodyParser.json());
import cors from 'cors'; 
app.use(cors());

//-- Password Reset Email --// 
import sendEmail from './ResetMail.js';
app.post('/api/sendMail', sendEmail);

//-- Login and Registration --// 
import loginRoutes from './LoginData.js';  
app.use("/api", loginRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
