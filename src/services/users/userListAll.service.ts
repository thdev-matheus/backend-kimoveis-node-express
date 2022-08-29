import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError.model";

export const userListAllService = async (userEmail: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  return users;
};
