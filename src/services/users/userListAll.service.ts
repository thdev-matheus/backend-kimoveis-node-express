import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError.model";

export const userListAllService = async (userEmail: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email: userEmail } });

  if (!user) {
    throw new AppError("User not found", 404, "https://http.cat/404");
  }

  if (!user.isAdm) {
    throw new AppError(
      "This route is for admins only",
      403,
      "https://http.cat/403"
    );
  }

  const users = await userRepository.find();

  return users;
};
