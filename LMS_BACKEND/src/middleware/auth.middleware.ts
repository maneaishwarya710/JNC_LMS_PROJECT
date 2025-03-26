import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth.type";
const secretKey = "JNC";
export const authMiddleware = (req: AuthRequest, res: Response, next:
    NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied" });
    try {
        const decoded = jwt.verify(token,secretKey) as {
            userId:
            number
        };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};