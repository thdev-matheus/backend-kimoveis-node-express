import { Router } from "express";

import { admValidation } from "../middlewares/admValidation.middleware";
import { authValidation } from "../middlewares/authValidation.middleware";

import { categoryCreatecontroller } from "../controllers/categories/categoryCreate.controller";
import { categoryListAllController } from "../controllers/categories/categoryListAll.controller";
import { categoryListPropertiesController } from "../controllers/categories/categoryListProperties.controller";

const router = Router();

export const categoriesRouter = () => {
  router.post("", authValidation, admValidation, categoryCreatecontroller);
  router.get("", categoryListAllController);
  router.get("/:categoryId/properties", categoryListPropertiesController);

  return router;
};
