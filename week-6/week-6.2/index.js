const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "iloveswarali"

const app = express();
app.use(express.json());
const users = [];


app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    });

    res.json({
        message: "You are logged in"
    });
})

app.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = users.find(function(u){
        if(u.username===username && u.password===password){
            return true;
        } else {
            return false;
        }
    });

    if(foundUser){
        const token = jwt.sign({
            username
        }, JWT_SECRET);
        foundUser.token=token;
        res.json({
            token:token
        })
    } else {
        res.json({
            message: "Invalid Credentials"
        });
    }
});

function auth(req, res, next){
    const token = req.headers.token;

    let decodedData = jwt.verify(token, JWT_SECRET);
    if(decodedData.username){
        req.username = decodedData.username;
        next();
    } else {
        res.json({
            message: "Invalid user"
        });
    }

}

app.get("/get-password", auth, function(req, res){
    const token = req.headers.token;

    const decodedData = jwt.verify(token, JWT_SECRET);

    if(req.username){
        const foundUser = users.find(function(u){
            if(u.username===username){
                foundUser = u;
            }
        });

        res.json({
            username: foundUser.username,
            password: foundUser.password
        });
    } 
})

app.listen(3000);