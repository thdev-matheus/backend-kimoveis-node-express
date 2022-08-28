import { Request, Response } from "express";
import { userListAllService } from "../../services/users/userListAll.service";

export const userListAllController = async (req: Request, res: Response) => {
  const { userEmail } = req;

  const userList = await userListAllService(userEmail);

  const users = userList.map((u) => {
    const { password, ...user } = u;
    return user;
  });

  return res.status(200).json(users);
};
