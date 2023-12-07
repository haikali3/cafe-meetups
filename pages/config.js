// config.js
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const MONGODB_URI = process.env.MONGODB_URI;

export { MONGODB_URI };
