import { Request, Response, NextFunction } from "express";
import { nextTick } from "process";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError.model";

export const admValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userEmail } = req;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email: userEmail } });

  if (!user?.isAdm) {
    throw new AppError(
      "This route can only be accessed by administrators.",
      403,
      "https://http.cat/403"
    );
  }

  next();
};
