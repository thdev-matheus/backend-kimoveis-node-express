import { Router } from "express";
import { userCreateController } from "../controllers/users/userCreate.controller";

const router = Router();

export const usersRouter = () => {
  router.use("", userCreateController);

  return router;
};
