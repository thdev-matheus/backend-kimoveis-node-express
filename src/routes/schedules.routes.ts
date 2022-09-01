import { Router } from "express";

import { authValidation } from "../middlewares/authValidation.middleware";
import { admValidation } from "../middlewares/admValidation.middleware";

import { scheduleCreateController } from "../controllers/schedules/scheduleCreate.controller";
import { scheduleListByPropertyController } from "../controllers/schedules/scheduleListByProperty.controller";

const router = Router();

export const schedulesRouter = () => {
  router.post("", authValidation, scheduleCreateController);
  router.get(
    "/properties/:propertyId",
    authValidation,
    admValidation,
    scheduleListByPropertyController
  );

  return router;
};
