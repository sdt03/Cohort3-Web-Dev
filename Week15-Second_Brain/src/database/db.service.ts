import mongoose from 'mongoose';
import { dbURI } from '../config';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            serverSelectionTimeoutMS: 10000, // 10 seconds
        });
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err);
        process.exit(1); // Stop the app if DB connection fails
    }
};

export default connectDB;
