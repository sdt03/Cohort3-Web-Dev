const express = require("express");
const { UserModel, TodoModel } =  require("./db");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { z } = require("zod");

JWT_SECRET = "nastedanaste";
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
mongoose.connect("mongodb+srv://shoumikdaterao10:ASZpOYImoj7K8nLu@cluster0.9vggz.mongodb.net/todo-app-database");
app.post("/signup", async (req, res)=>{
    //Ass: Check that password has 1 uppercase char, 1 lowercase char, 1 spl character
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(6).regex(/[A-Z]/, {message: "Password should contain atleast one uppercase character"})
        .regex(/[a-z]/, {message: "Password should contain atleast 1 lowercase character"})
        .regex(/[\W_]/, {message: "Should contain atleast 1 special character"}),
        name: z.string()
    });

    const parsedWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedWithSuccess.success){
        res.json({
            message: "Incorrect format",
            error: parsedWithSuccess.error
        })
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    try{
        const hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword); 
        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        });
    } catch(e){
        res.json({
            message: "Email is already in use"
        });
    }
    res.json({
        message: "You have signed in successfully"
    });
});

app.post("/login", async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
    });

    if(!response){
        res.status(403).json({
            message: "User does not exist"
        });
        return
    }

    const passwordMatch =  await bcrypt.compare(password, response.password);

    if(passwordMatch){
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET);
        res.json({
            token: token
        });
    } 

    else {
        res.status(403).json({
            message: "Invalid Credentials"
        });
    }

});

function auth(req, res, next){
    const token = req.headers.token;

    const response = jwt.verify(token, JWT_SECRET);

    if(response){
        req.userId = response.id;
        next();
    } else {
        res.json({
            message: "Invalid Creds"
        });
    }
}

app.post("/todo", auth, async (req, res)=>{
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });
    res.json({
        message: "todo created" 
    });
});

app.get("/todos", (req, res)=>{

});

app.listen(3000);