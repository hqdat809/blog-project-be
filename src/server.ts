import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import "express-async-errors";

import BaseRouter from "@src/routes";

import EnvVars from "@src/common/EnvVars";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import Paths from "@src/common/Paths";
import { NodeEnvs } from "@src/common/misc";
import "dotenv/config";
import { z } from "zod";
import { handleAppError, handleZodError } from "./middleware/errorHandler";
import { clearAuthCookies, REFRESH_PATH } from "./util/cookies";

// **** Variables **** //

const app = express();

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan("dev"));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (req.path === REFRESH_PATH) {
    clearAuthCookies(res);
  }

  if (error instanceof z.ZodError) {
    handleZodError(res, error);
  }

  if (error instanceof Error) {
    handleAppError(res, error);
  }

  res
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .send("Internal server error");
});

// **** Front-End Content **** //

// Set views directory (html)
const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

// Nav to users pg by default
app.get("/", (_: Request, res: Response) => {
  return res.redirect("/users");
});

// Redirect to login if not logged in.
app.get("/users", (_: Request, res: Response) => {
  return res.sendFile("users.html", { root: viewsDir });
});

// **** Export default **** //

export default app;
