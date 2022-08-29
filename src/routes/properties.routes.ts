import { Router } from "express";

import { admValidation } from "../middlewares/admValidation.middleware";
import { authValidation } from "../middlewares/authValidation.middleware";

import { propertyCreateController } from "../controllers/properties/propertyCreate.controller";
import { propertyListAllController } from "../controllers/properties/propertyListAll.controller";

const router = Router();

export const propertiesRouter = () => {
  router.post("", authValidation, admValidation, propertyCreateController);
  router.get("", propertyListAllController);

  return router;
};
