import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    firstName : {type : String , require : true , trim : true},
    lastName : {type : String , require : true , trim : true},
    age : {type : Number , require : true , min : 1},
    gender : {type : String , require : true , enum : ['Male' , 'Female' , 'Other']},
    image : {type :String , require : true }
},{
    timestamps : true
})

const Student = mongoose.model('Student' , studentSchema)

export default Student

