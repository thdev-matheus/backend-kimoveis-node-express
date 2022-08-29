import { Router } from "express";

import { userCreateController } from "../controllers/users/userCreate.controller";
import { userDeleteController } from "../controllers/users/userDelete.controller";
import { userListAllController } from "../controllers/users/userListAll.controller";

import { authValidation } from "../middlewares/authValidation.middleware";

const router = Router();

export const usersRouter = () => {
  router.post("", userCreateController);
  router.get("", authValidation, userListAllController);
  router.delete("/:userId", authValidation, userDeleteController);

  return router;
};
