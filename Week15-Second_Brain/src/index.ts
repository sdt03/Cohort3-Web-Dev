import express from 'express';
import {z} from 'zod';
import { JWT_SECRET } from './config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from './database/schema';
import connectDB from './database/db.service';

const app = express();
app.use(express.json());

connectDB();

app.post("/api/v1/signup", async (req, res)=>{
    const requriedBody = z.object({
        username: z.string().min(3).max(10),
        password: z.string().min(6).regex(/[A-Z]/, {message: "Password should contain atleast one capital letter"})
        .regex(/[a-z]/, {message: "Password should contain atleast 1 lowercase character"})
        .regex(/[\W_]/, {message: "Should contain atleast 1 special char"})
    });

    const parsed = requriedBody.safeParse(req.body);

    if(!parsed.success){
        res.json({
            message: "Incorrect format",
            error: parsed.error
        });
    }

    const username = req.body.username;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword);
        await UserModel.create({
            username: username,
            password: hashedPassword
        });
        
    } catch (error) {
        res.json({
            message: `Account with ${username} already exists`
        });
    }
    res.json({
        "message": "You have signed up Successfully"
    });
});

app.post("/api/v1/signin", async (req, res)=>{
    const signInSchema = z.object({
        username: z.string().min(3).max(10),
        password: z.string().min(6)
    });

   const parsedData = signInSchema.safeParse(req.body);

   if(!parsedData.success){
        res.json({
            message: "Invalid username or password"
        });
   }
    const username: string = req.body.username??"";
    const password: string = req.body.password??"";

    const User = await UserModel.findOne({ username });

    if(!User){
        res.status(404).json({
            message: "Username not found. Please sign in"
        });
    } else {
        const passwordMatch = await bcrypt.compare(password, User.password as string);
        if(passwordMatch){
            const token = jwt.sign({
              id: User._id.toString()
            }, JWT_SECRET);
            res.json({
                token: token
            });
        } else {
            res.status(403).json({
               message: "Invalid Credentials"
            });
        }
    }

});

app.delete("/api/v1/brain/content", (req, res)=>{

});

app.listen(3000);
console.log("Listening on port 3000");