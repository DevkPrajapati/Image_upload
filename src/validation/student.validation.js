import joi from 'joi';

const studentSchema = joi.object({
    firstName : joi.string().min(2).max(50).required(),
    lastName : joi.string().min(2).max(50).required(),
    age : joi.number().integer().min(1).required(),
    gender : joi.string().valid('Male' , 'Female' , 'Other').required(),

})

export default studentSchema;