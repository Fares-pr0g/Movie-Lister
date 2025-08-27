import mongoose from 'mongoose';

export const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB ✅");
    }catch(err){
        console.error("Error connecting to MONGODB", err);
        process.exit(1); //Exit the process with failure 
    }
}