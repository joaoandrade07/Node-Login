import { NextFunction, Request, Response } from "express";
import { IJwtPayload } from "../../interfaces/Jwt";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: IJwtPayload;
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if(!token) return res.status(401).json("Token ausente");
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IJwtPayload;
        req.user = decoded;
        next();
    } catch (error:any) {
        if(error.name == "TokenExpiredError") return res.status(401).json("Token expired");
        return res.status(403).json("Invalid Token");
    }
}