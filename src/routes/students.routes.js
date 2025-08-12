import express from 'express';
import { createStudent, getStudents } from '../controllers/student.controller.js';
import upload from '../middlewares/multer.js';
const studentRoutes = express.Router();

studentRoutes.post('/create' , upload.single('image') , createStudent)
studentRoutes.get('/get'  , getStudents)


export default studentRoutes;