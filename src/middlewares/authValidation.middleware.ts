import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError.model";
import jwt from "jsonwebtoken";

export const authValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(
        "Authentication token is missing",
        401,
        "https://http.cat/401"
      );
    }

    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (err: any, decoded: any) => {
        req.userEmail = decoded.email;
        next();
      }
    );
  } catch (err) {
    return res.status(401).json({
      status: "Error",
      code: 401,
      message: "Invalid token!",
      image: "https://http.cat/401",
    });
  }
};
