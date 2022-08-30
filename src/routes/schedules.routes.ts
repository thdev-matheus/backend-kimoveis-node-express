import { Router } from "express";

import { authValidation } from "../middlewares/authValidation.middleware";

import { scheduleCreateController } from "../controllers/schedules/scheduleCreate.controller";

const router = Router();

export const schedulesRouter = () => {
  router.post("", authValidation, scheduleCreateController);

  return router;
};
