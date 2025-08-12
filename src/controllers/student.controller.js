import Student from "../models/student.models.js";
import studentSchema from "../validation/student.validation.js";
import cloudinary from "../config/cloudinary.js";
import catchAsync from "../middlewares/catchAsync.middleware.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createStudent = catchAsync(async (req, res, next) => {
  try {
    const { error } = studentSchema.validate(req.body);

    if (error) {
      throw new ErrorHandler(error.details[0].message, 400);
    }

    const { firstName, lastName, age, gender } = req.body;

    if (!req.file) {
      throw new ErrorHandler("image is required", 400);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });

    const students = await Student.create({
      firstName,
      lastName,
      age,
      gender,
      image: result.secure_url,
    });

    await students.save();

    return res.status(201).json({
      success: true,
      message: "Students created Successfully..",
      students,
    });
  } catch (error) {
    return next(error);
  }
});


export const getStudents = catchAsync(async (req, res, next) => {
  try {
    const { error } = studentSchema.validate(req.body);

    if (error) {
      throw new ErrorHandler(error.details[0].message, 400);
    }

    const students = await Student.find({});

    return res.status(200).json({
      success: true,
      message: 'Students get successfully..',
      students
    })
  } catch (error) {
    return next(error);
  }
});


export const updateStudents = catchAsync(async (req, res, next) => {
  try {

    const { id } = req.params;

    const { firstName, lastName, age, gender } = req.body;

    const student = await Student.findById(id);

    if (!student) {
      throw new ErrorHandler('Students Not Founds.', 404);
    }

    const { error } = studentSchema.fork(
      ["firstname", "lastname", "age", "gender"],
      (schema) => schema.optional()
    ).validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    student.firstName = firstName;
    student.lastName = lastName;
    student.age = age;
    student.gender = gender;

    if (req.file) {
      if (student.image) {
        const public_id = student.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`student/${public_id}`)
      }


      const updateImage = await cloudinary.uploader.upload(req.file.path, {
        folder: 'uploads'
      })

      student.image = updateImage.secure_url
    }


    await student.save();

    return res.status(200).json({
      success: true,
      message: "Students Updated Successfully..",
      student,
    });

  } catch (error) {
    return next(error);

  }
})