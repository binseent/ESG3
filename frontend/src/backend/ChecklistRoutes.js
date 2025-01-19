import express from "express";
import { getCourseChecklist } from "./ChecklistController.js"; 
const router = express.Router();


router.get("/course_checklist", getCourseChecklist);

export default router; 
