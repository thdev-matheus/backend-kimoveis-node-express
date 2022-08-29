import { Express } from "express";
import { categoriesRouter } from "./categories.routes";
import { propertiesRouter } from "./properties.routes";
import { sessionRouter } from "./sesion.routes";
import { usersRouter } from "./users.routes";

export const appRouter = (app: Express) => {
  app.use("/users", usersRouter());
  app.use("/login", sessionRouter());
  app.use("/categories", categoriesRouter());
  app.use("/properties", propertiesRouter());
};
