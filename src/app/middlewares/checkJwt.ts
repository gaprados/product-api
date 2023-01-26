import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function checkJwt(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  const [, tokenValue] = token?.split(' ') || [];

  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(tokenValue, 'MYSECRETKEY');
    req.userId = decoded.sub as string;
    next();
  } catch (err) {
    res.status(400).json({
      error: "Invalid token."
    })
  }

}