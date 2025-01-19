//Server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

import checklistRoutes from "./ChecklistRoutes.js";
app.use("/api", checklistRoutes);

//-- Password Reset Email --// 
import sendEmail from './ResetMail.js';
app.post('/api/sendMail', sendEmail);

//-- Login and Registration --//
import loginRoutes from './LoginData.js';
app.use("/api", loginRoutes);

//-- Enrollees table --//
import enrolleesRoutes from './AEnrolleesTable.js';
app.use("/api", enrolleesRoutes);

//-- Reset request table --//
import passwordResetRoutes from './ResetPassTable.js';
app.use('/api', passwordResetRoutes);

//-- Student Information --//
import studentInfoRoutes from './StudentInfoData.js';
app.use('/api', studentInfoRoutes);

//-- Manage Student Information //
import studentManageRoutes from './StudentManageData.js';
app.use('/api', studentManageRoutes);


// Enrollmnt entries to database //
import enrollmentProcess from './EnrollmentProcess.js';
app.use('/api', enrollmentProcess);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});