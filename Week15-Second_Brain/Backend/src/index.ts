import express from 'express';
import {z} from 'zod';
import { JWT_SECRET } from './config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ContentModel, UserModel, LinkModel } from './database/schema';
import connectDB from './database/db.service';
import { userMiddleware } from './middleware/useAuth';
import { random } from './utils';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

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

app.post("/api/v1/content", userMiddleware, async (req, res)=>{
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;

    await ContentModel.create({
        link: link,
        type: type,
        title: title,
        userId: req.userId,
        tags: []
    });

    res.json({
        "message": "Content added"
    });
}); 

app.get("/api/v1/content", userMiddleware, async (req,res)=>{
    const userId = req.userId;
    
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username");

    res.json({
        content
    });
});

app.delete("/api/v1/content", userMiddleware, async (req, res)=>{
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        userId: req.userId
    });

    res.json({
        "message": "Deleted"
    });
});

app.post("/api/v1/share", userMiddleware, async(req, res)=>{
    const share = req.body.share;

    if(share){
        const existingLink = await LinkModel.findOne({
            userId: req.userId
        });
        if(existingLink){
            res.json({
                hash: existingLink.hash
            });
            return
        }
        const hash = random(10);
        await LinkModel.create({
            userId: req.userId,
            hash: hash
        });

        res.json({
            hash
        });
    } else {
        await LinkModel.deleteOne({
            userId: req.userId,
        });
        res.json({
            message: "Remove Link"
        });
    }
})

app.get("/api/v1/:shareLink", async(req, res)=>{
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if(!link){
        res.status(401).json({
            message: "Sorry incorrect input"
        });
        return;
    }

    const content = await ContentModel.find({
        userId: link.userId
    })
    console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    });

    if(!user){
        res.status(411).json({
            message: "user not found"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })
})


app.listen(3000);
console.log("Listening on port 3000");