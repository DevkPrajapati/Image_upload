import Student from "../models/student.models.js";
import studentSchema from "../validation/student.validation.js";
import { v2 as cloudinary } from 'cloudinary'
import catchAsync from '../middlewares/catchAsync.middleware.js';
import ErrorHandler from '../utils/errorHandler.js';

export const createStudent = catchAsync(async (req, res, next) => {
    try {

        const { error } = studentSchema.validate(req.body);

        if (!error) {
            throw new ErrorHandler('Validation error', 400);
        }

        const { firstName, lastName, age, gender } = req.body;

        if (!req.file) {
            throw new ErrorHandler("image is required", 400);
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads'
        })

        const students = await Student.create({
            firstName,
            lastName,
            age,
            gender,
            image: result.secure_url
        })

        await students.save();

        return res.status(201).json({
            success: true,
            message: 'Students created Successfully..',
            students
        })
    } catch (error) {
        throw new ErrorHandler('server error while create Students', 500)
    }
})

