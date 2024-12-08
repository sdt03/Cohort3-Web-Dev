/*class Cuboid {
    constructor(length, width, height){
        this.length = length;
        this.width = width;
        this.height = height;
    }

    area(){
        return this.length * this.width * this.height;
    }
}

const cuboid = new Cuboid(2,4,6);
const area = cuboid.area();
console.log(area); */

 /*function setTimeoutPromisified(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function callBack(){
    console.log("5s have passed");
}

setTimeoutPromisified(5000).then(callBack);*/

/*function random(resolve){
    resolve();
}

let p = new Promise(random);

function callback(){
    console.log("hi from callback");
}

p.then(callback);*/

//promisified read, write and clean;

const fs = require("fs");

/*
function FilePromified(finalFile){
    //when promise is made to this function, argument of this function is returned in the callback function i.e., finalFile will be returned
    fs.readFile("a.txt", "utf-8", function(err,data){
        finalFile(data);
    })
}

function readFile(fileName){
    //promise calls filepromified; 
    return new Promise(FilePromified);
}
function callBack(contents){
    console.log(contents);
}

readFile().then(callBack);*/


function writeinTheFinalFile(finalFile){
    data1 = "Demo for promises in javascript";
    fs.writeFile("a.txt", data1, (err) => {
        if (err) console.log(err);
        else{
            console.log("file written successfully");
            console.log("Promise works");
            finalFile(data1);
        }
    })
}
function writeFile(fileName){
    return new Promise(writeinTheFinalFile)
}
function callBack(){ 
    console.log("Content appended");
}

writeFile().then(callBack);