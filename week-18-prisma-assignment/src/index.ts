import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { userMiddleware } from "./userAuth";
const app = express();
app.use(express.json());
const JWT_SECRET="somethingjustlikethis"
const client = new PrismaClient();


app.post("/signup", async (req, res)=> {
    const {name, username, password} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 6);
        const user = await client.user.create({
            data: {
                name,
                username,
                password: hashedPassword
            },
        });

        res.status(201).json({message: "user created", userId: user.id});

    } catch (error) {
        res.status(500).json({message : "something went wrong"});
    }
});

app.post("/signin", async (req , res) => {
    const {username, password} = req.body;

    try {
        const user = await client.user.findFirst({
            where: { username }
        });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = Jwt.sign({
                userId: user.id
            }, JWT_SECRET);
            res.json({ token });
            return;
        }
        
        res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.post("/travel", userMiddleware, async (req , res) => {
    const {title, destinationCity, destinationCountry} = req.body
    try {
        const userId = req.userId;
        const user = await client.user.findFirst({
            where: {
                id: userId
            }
        })
        const travel = await client.travel.create({
            data: {
                title,
                destinationCity,
                destinationCountry,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });

        res.json({travel});

    } catch (error) {
        console.error("error: ", error);
    }
});

app.get("/get-plans", userMiddleware, async(req, res)=>{
    try{
        const userId = req.userId;

        const plans = await client.travel.findMany({
            where: {
                userId: userId
            },
            select: {
                id: true,
                title: true,
                destinationCity: true,
                destinationCountry: true,
            }
        });

        res.json({plans});
    } catch (error){

    }
});

app.listen(3000);