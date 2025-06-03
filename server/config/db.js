import mongoose from 'mongoose';

export const connectDB = () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("DB connected successfully");
        })
        mongoose.connect(`${process.env.MONGODB_URI}/mern-a`)
    } catch (error) {
        console.log(error.message);
    }
}