const adminRouter =  require("express").Router();
const { adminModel } = require("../db");
const jwt_admin = "admin123";
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const bcrypt = require("bcrypt");

adminRouter.post("/signup", async (req, res)=>{
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string()
    });
    
    const parsedData = requiredBody.safeParse(req.body);
    if(!parsedData.success){
        return res.json({
            message: "Incorrect Format, please try again",
            error: parsedData.error.errors
        });
    }

    const { email, password, firstName, lastName} = parsedData.data;
    try{
        const hashedPassword = await bcrypt.hash(password, 5);

        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
        res.json({
            message: "Signup successful"
        });
    } catch (e){
        res.status(500).json({
            message: "Something went wrong"   
        });
    }
});

adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await adminModel.findOne({ email: email });
        
        if (!user) {
            return res.status(403).json({
                message: "User not found"
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (passwordMatch) {
            const token = jwt.sign(
                { id: user._id }, jwt_admin);
            return res.json({
                message: "Login successful",
                token: token
            });
        } else {
            return res.status(403).json({
                message: "Incorrect password"
            });
        }
    } catch (e) {
        console.error("Error in /login endpoint:", e); 
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


module.exports = {
    adminRouter
}
