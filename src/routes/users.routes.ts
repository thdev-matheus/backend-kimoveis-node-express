import { Router } from "express";

import { userCreateController } from "../controllers/users/userCreate.controller";
import { userDeleteController } from "../controllers/users/userDelete.controller";
import { userListAllController } from "../controllers/users/userListAll.controller";

import { authValidation } from "../middlewares/authValidation.middleware";
import { admValidation } from "../middlewares/admValidation.middleware";

const router = Router();

export const usersRouter = () => {
  router.post("", userCreateController);
  router.get("", authValidation, admValidation, userListAllController);
  router.delete(
    "/:userId",
    authValidation,
    admValidation,
    userDeleteController
  );

  return router;
};
