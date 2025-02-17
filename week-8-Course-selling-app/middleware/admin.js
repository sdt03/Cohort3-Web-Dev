const express = require("express");
const { JWT_ADMIN_PASSWORD} = require("../config");
const jwt = require("jsonwebtoken");

function adminAuthMiddleware(req, res, next){
    //get token
    const token = req.headers.token;

    /*
    verify the token => if found then ok else throw err
    */
    try{
        const decodedData = jwt.verify(token, JWT_ADMIN_PASSWORD);
        if(decodedData){
            req.adminId = decodedData.adminId
            res.json({
                msg: "You are logged in"
            })
        } else {
            res.json({
                msg: "admin not found! You need to sign up"
            })
        }
    } catch(e){
        console.error(errors.error);
    }
}