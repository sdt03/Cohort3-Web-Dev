const express = require("express");
const { JWT_USER_PASSWORD} = require("../config");
const jwt = require("jsonwebtoken");

function userAuthMiddleware(req, res, next){
    //get token
    const token = req.headers.token;

    /*
    verify the token => if found then ok else throw err
    */
    try{
        const decodedData = jwt.verify(token, JWT_USER_PASSWORD);
        if(decodedData){
            req.userId = decodedData.userId
            res.json({
                msg: "You are logged in"
            })
        } else {
            res.json({
                msg: "User not found! You need to sign up"
            })
        }
    } catch(e){
        console.error(errors.error);
    }
}