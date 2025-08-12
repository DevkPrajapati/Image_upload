import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('MonogDB Connected Successfully..');
        
    } catch (error) {
        console.log('Unable to connected DB',error);
        throw error;
    }
}

export default connectDB; 