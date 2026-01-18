import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export const connectDB = async (): Promise<void> => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) {
            logger.error('MongoDB URI not found in .env file');
            throw new Error('MongoDB URI not found');
        }

        logger.info('Attempting to connect to MongoDB...');
        logger.info('Connection string (masked):', MONGO_URI.replace(/\/\/.*@/, '//***:***@'));
        
        // Set mongoose options for better connection handling
        mongoose.set('strictQuery', false);
        
        const conn = await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // 5 second timeout
            socketTimeoutMS: 45000,
            family: 4, // Use IPv4, skip trying IPv6
        });
        
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
        logger.info(`Database: ${conn.connection.name}`);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logger.error(`MongoDB Connection Error: ${errorMessage}`);
        logger.info('Server will continue without MongoDB for now...');
        // Don't exit, let server start for testing
    }
};
