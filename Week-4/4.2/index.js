import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

let todos = [
];



app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})
    
