import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError.model";

export const userDeleteService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new AppError("User not found", 404, "https://http.cat/404");
  }

  if (!user.isAdm) {
    throw new AppError(
      "This route can only be accessed by administrators.",
      401,
      "https://http.cat/401"
    );
  }

  if (!user.isActive) {
    throw new AppError(
      "Unable to delete users who are not active",
      401,
      "https://http.cat/401"
    );
  }

  user.isActive = false;

  await userRepository.save(user);

  return "User successfuly deleted";
};
