import { Request, Response } from "express";
import { AppError } from "../../errors/appError.model";
import { userDeleteService } from "../../services/users/userDelete.service";

export const userDeleteController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    throw new AppError("User id is missing", 400, "https://http.cat/400");
  }

  const deletedUserMessage = await userDeleteService(userId);

  return res.status(204).json({ message: deletedUserMessage });
};
