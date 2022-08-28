import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError.model";

export const AppErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "Error",
      code: err.statusCode,
      message: err.message,
      image: err.image,
    });
  }

  return res.status(500).json({
    status: "Error",
    code: 500,
    message: "Internal server error",
    Image: "https://http.cat/500",
  });
};
