import express from 'express';
import { createStudent } from '../controllers/student.controller.js';
import upload from '../middlewares/multer.js';
const studentRoutes = express.Router();

studentRoutes.post('/create' , upload.single('image') , createStudent)

export default studentRoutes;