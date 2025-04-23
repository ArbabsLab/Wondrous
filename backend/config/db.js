import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected DB");
    } catch (error){
        console.log(`${error.message}`);
        process.exit(1);
    }};