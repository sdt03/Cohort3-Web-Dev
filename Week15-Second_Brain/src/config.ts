import * as dotenv from 'dotenv';

dotenv.config();
console.log("hi from config.ts");

if(!process.env.MONGO_URI){
    throw new Error("Not defined");
}

export const dbURI= process.env.MONGO_URI

export const jwt = "randomnashe"

