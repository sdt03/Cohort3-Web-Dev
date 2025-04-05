import express from "express";

import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types"
import { prisma } from "@repo/db/client"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware/middleware";

const app = express();
app.use(express.json());


app.post("/signup", async (req, res)=> {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        console.log(parsedData.error);
        res.json({
            message: "Incorrect Inputs!"
        });
        return;
    }
    try {
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

        const user = await prisma.user.create({
            data: {
                email: parsedData.data.email,
                password: hashedPassword,
                name:  parsedData.data.name    
            }
        });

        res.json({
            userId: user.id
        });

    } catch (e) {
        res.json({
            message: "Problem created an user"
        });
        console.error(e);
    }
});

app.post("/signin", async (req, res)=>{
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        console.log(parsedData.error);
        res.json({
            message: "Incorrect inputs!"
        });
        return;
    }
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email: parsedData.data.email
            }
        });
        if(!existingUser){
            res.json({
                message: "User does not exist"
            });
            return;
        }

        const comparePassword = await bcrypt.compare(parsedData.data.password, existingUser.password);
        if(!comparePassword){
            res.json({
                message: "Incorrect password"
            });
        }

        const token = jwt.sign({
            userId: existingUser?.id
        }, JWT_SECRET);

        res.json({
            token
        });

    } catch (e) {
        console.error(e);
        res.json({
            message: "error occured!"
        })
    }
});

app.use("/rooms", middleware, async (req, res)=>{
    const parsedData = CreateRoomSchema.safeParse(req.body);

    if(!parsedData.success){
        res.json({
            message: "Incorrect inputs"
        });
        return;
    }

    const userId = req.userId;
    if(!userId){
        throw new Error("Invalid token! not validated");   
    }

    try {
        await prisma.room.create({
            data:{
                slug: parsedData.data.name,
                adminId: userId
            }
        });
        
        res.json({
            message: "Room created"
        });

    } catch (error) {
        console.log("Room already exists", error);
        res.json({
            message: "Room already exists"
        })
    }
})



app.listen(3001);