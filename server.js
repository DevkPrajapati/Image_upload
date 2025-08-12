import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/config/db.js';

import studentRoutes from './src/routes/students.routes.js';
const app = express();


app.use(express.json());

app.use('/api/v1', studentRoutes)


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT , () => {
            console.log(`Server is running PORT ${PORT}`);
        })
    } catch (error) {
        console.error(error);
    }
}

startServer();