import mongoose from 'mongoose';
import { error } from 'node:console';

const connectDB = async () : Promise<void> => {
    try 
    {
        const MONGO_URI = process.env.MONGO_URI;
        if(!MONGO_URI)
        {
            console.error("❌ MongoDB URI not found in .env file");
            process.exit(1);
        }
        const conn = await mongoose.connect(MONGO_URI);  
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);  
    } 
    catch (error) 
    {
        console.error(`❌ MongoDB Connection Error: ${error}`);
        process.exit(1);
    }
};

export default connectDB;