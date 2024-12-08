const router = require("express").Router();
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { userAuthMiddleware } = require("../middleware/user");

router.post("/signup", async function(req, res){
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(7).max(14).regex(/[A-Z]/, {message: "Should contain atleast 1 uppercase character"})
        .regex(/[a-z]/, {message: "Should contain atleast 1 lowercase character"}).regex(/[\W_]/, {message: "Should contain atleast 1 special character"}),
        firstName: z.string(),
        lastName: z.string()
    });

    const parsedData = requiredBody.safeParse(req.body);
    if(!parsedData.success){
        return res.json({
            message: "Incorrect format, please try again!",
            error: parsedData.error.errors
        });
    }

    const { email, password, firstName, lastName } = parsedData.data
    
    try{
        const hashedPassword = await bcrypt.hash(password, 5);
        
        await userModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });
        res.json({
            message: "Signup succeeded"
        });
    } catch (e){
        res.json({
            message: "Something went wrong"
        });
    }
})

router.post("/login", async function (req, res){
    const email = req.body.email;
    const password = req.body.password;
    
    try{
        const user = await userModel.findOne({
            email: email
        });

        if(!user || user.password!==password){
            return res.status(401).json({
                message: "Invalid username and Password"
            });
        }
        // const passwordMatch = await bcrypt.compare(password, user.password)
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);
        res.status(200).json({
            token: token
        })
        
    } catch (e) {
        res.status(500).json({
            message: "Invalid Credentails"
        })
    }
})

module.exports = {
    router
};