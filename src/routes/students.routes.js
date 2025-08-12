import express from 'express';
import { createStudent, getStudents, updateStudents } from '../controllers/student.controller.js';
import upload from '../middlewares/multer.js';
const studentRoutes = express.Router();

studentRoutes.post('/create' , upload.single('image') , createStudent)
studentRoutes.get('/get'  , getStudents)
studentRoutes.put('/update-student/:id'  , updateStudents)



export default studentRoutes;