import { hashSync } from "bcrypt";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError.model";
import { IUserRequest } from "../../interfaces/users";

export const userCreateService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const userAlreadyExists = await userRepository.findOne({ where: { email } });

  if (userAlreadyExists) {
    throw new AppError(
      "Email already exists in database.",
      400,
      "https://http.cat/400"
    );
  }

  const newUser = userRepository.create({
    name,
    email,
    isAdm,
    password: hashSync(password, 10),
  });

  await userRepository.save(newUser);

  return newUser;
};
