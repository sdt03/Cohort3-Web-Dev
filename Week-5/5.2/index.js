const express = require("express");

const port = 3000;
const app = express();

function loggingEverything(req, res, next){
    const timestamp = new Date().getTime();
    let url = req.url;
    let method = req.method
    console.log(timestamp, url, method); 
    next();
}

let count = 0;

function numberOfRequests(req, res, next){
    count++;
    next();
}

app.use(numberOfRequests);

app.get("/sum", (req, res)=>{
    console.log(req.name);
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans : a+b
    });
});

app.get("/multiply", (req, res)=>{
    console.log(req.name);
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans : a*b
    });
    
});

app.get("/divide", (req, res)=>{
    console.log(req.name);
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans : a/b
    });
});

app.get("/subtract", (req, res)=>{
    console.log(req.name);
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans : a-b
    });
});

app.get("/count", (req,res)=>{
    res.json({
        ans: count
    });
});

app.listen(port, () =>{
    console.log(`port listening on ${port}`);
});