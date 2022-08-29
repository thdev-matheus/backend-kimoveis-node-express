import { Request, Response } from "express";
import { AppError } from "../../errors/appError.model";
import { IUserRequest } from "../../interfaces/users";
import { userCreateService } from "../../services/users/userCreate.service";

export const userCreateController = async (req: Request, res: Response) => {
  const { name, email, password, isAdm }: IUserRequest = req.body;

  if (!name || !email || !password || !isAdm) {
    throw new AppError(
      "The following fields are required: name: string, email: string, password: string, isAdm: boolean.",
      400,
      "https://http.cat/400"
    );
  }

  const newUser = await userCreateService({ name, email, password, isAdm });
  const { password: pwd, ...user } = newUser;

  return res.status(201).json(user);
};
