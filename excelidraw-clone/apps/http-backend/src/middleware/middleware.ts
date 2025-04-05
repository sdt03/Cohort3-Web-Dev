import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

export function middleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "";

    const decoded = jwt.verify(token as string, JWT_SECRET) as JwtPayload;

    if(decoded){
        req.userId = decoded.Id;
        next();
    } else {
        res.json({
            message: "Invalid Session"
        });
    }
}
