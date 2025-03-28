import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "../config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, JWT_SECRET) as JwtPayload;
    if(decoded){
        req.userId = decoded.id;
        next();
    } else {
        res.status(403).json({
            message: "You are not logged in"
        });
    }
}