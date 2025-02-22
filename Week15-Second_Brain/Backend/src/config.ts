import * as dotenv from 'dotenv';

dotenv.config();
console.log("hi from config.ts");

console.log("Connecting to MongoDB at:", process.env.MONGO_URI);

if(!process.env.MONGO_URI){
    throw new Error("Not defined");
}

export const dbURI= process.env.MONGO_URI;

export const JWT_SECRET = "randomnashe"

