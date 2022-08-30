import { compareSync } from "bcrypt";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError.model";
import { IUserLogin } from "../../interfaces/users";
import jwt from "jsonwebtoken";

export const loginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    throw new AppError(
      "Invalid Email or Password",
      403,
      "https://http.cat/403"
    );
  }

  if (!user.isActive) {
    throw new AppError("User is not active", 403, "https://http.cat/403");
  }

  if (!compareSync(password, user.password)) {
    throw new AppError(
      "Invalid Email or Password",
      403,
      "https://http.cat/403"
    );
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "24h",
    }
  );

  return { token, user };
};
