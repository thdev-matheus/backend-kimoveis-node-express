import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { appRouter } from "./routes";
import { AppErrorMiddleware } from "./middlewares/appError.middleware";

const app = express();
app.use(express.json());

appRouter(app);

app.use(AppErrorMiddleware);

export default app;
