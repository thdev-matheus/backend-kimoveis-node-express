import { Express } from "express";
import { usersRouter } from "./users.routes";

export const appRouter = (app: Express) => {
  app.use("/users", usersRouter());
};
