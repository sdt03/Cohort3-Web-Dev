const express = require("express");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "shoumikdaterarandom"

const app = express();
app.use(express.json());

const users = [];

// function generateToken(){
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
//         'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O','P','Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
//         '1', '2','3','4','5','6','7','8','9','0'
//     ];

//     let token = "";
//     for(let i=0; i<32;i++){
//         token += options[Math.floor(Math.random()*options.length)];
//     }
//     return token;
// }

app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "You are signed in"
    })
});

app.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(function(u){
        if(u.username==username&&u.password==password){
            return true;
        } else {
            return false;
        }
    })
    if(foundUser){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);
        foundUser.token=token;
        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        }); 
    }
});
 
app.get("/me", function(req, res){
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token, JWT_SECRET);
    const username = decodedInfo.username;

    let foundUser = users.find(function(u){
        if(u.token==token){
            foundUser = u.username;
        }
    })
    if(foundUser){ 
        res.json({
            username: foundUser.username,
            password: foundUser.password 
        });
    } else {
        res.json({
            message: "Invalid Token"
        })
    }
})


app.listen(3000);