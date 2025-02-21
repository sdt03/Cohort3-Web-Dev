import express from 'express';
import connectDB from './db.service';

const app = express();

async function random(){
    await connectDB();
    console.log("db started");
}

random();