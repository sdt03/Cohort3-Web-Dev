const express = require("express");

const port = 3000;
const app = express();

// function add(a,b){
//     return a+b;
// }
// function multiply(a,b){
//     return a*b;
// }

// function divide(a,b){
//     return a/b;
// }

// function subtract(a,b){
//     return a-b;
// }

app.get("/add/:a/:b", (req, res)=>{
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    // const addition = add(a,b);
    // res.send(addition.toString());
    // console.log(addition);

    res.json({
        answer: a+b
    })
});

app.get("/multiply", (req, res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    const multiplication = multiply(a,b);
    res.send(multiplication.toString());
});

app.get("/divide", (req, res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    const division = divide(a,b);
    res.send(division.toString());
});

app.get("/subtract", (req, res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    const subtraction = subtract(a,b);
    res.send(subtraction.toString());
});

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
});