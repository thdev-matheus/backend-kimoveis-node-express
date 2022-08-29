import { Request, Response } from "express";
import { AppError } from "../../errors/appError.model";
import { IUserLogin } from "../../interfaces/users";
import { loginService } from "../../services/session/login.service";

export const loginController = async (req: Request, res: Response) => {
  const { email, password }: IUserLogin = req.body;

  if (!email || !password) {
    throw new AppError(
      "The following fields are required: email: string, password: string.",
      400,
      "https://http.cat/400"
    );
  }

  const loggedUser = await loginService({ email, password });
  const { password: pwd, ...user } = loggedUser.user;

  return res.status(200).json({
    token: loggedUser.token,
    user,
  });
};
