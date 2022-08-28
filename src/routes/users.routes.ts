import { Router } from "express";

import { userCreateController } from "../controllers/users/userCreate.controller";
import { userListAllController } from "../controllers/users/userListAll.controller";

import { authValidation } from "../middlewares/authValidation.middleware";

const router = Router();

export const usersRouter = () => {
  router.post("", userCreateController);
  router.get("", authValidation, userListAllController);

  return router;
};
