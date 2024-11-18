import { Router } from "express";

import Paths from "../common/Paths";
import AuthRoutes from "./AuthRoutes";
import PostRoutes from "./PostRoutes";
import {
  authenticate,
  authenticateWithAuthor,
} from "@src/middleware/authenticate";

// **** Variables **** //

const apiRouter = Router();

// ** Add UserRouter ** //

// Init router

// Get all users

// Add auth routes
const authRouter = Router();

authRouter.post(Paths.Auth.Register, AuthRoutes.register);
authRouter.post(Paths.Auth.Login, AuthRoutes.login);
authRouter.post(Paths.Auth.Logout, AuthRoutes.logout);

// post auth routes
const postRouter = Router();

postRouter.post(Paths.Post.Add, authenticateWithAuthor, PostRoutes.add);
postRouter.get(Paths.Post.Get, authenticate, PostRoutes.getAll);
postRouter.put(Paths.Post.Update, authenticateWithAuthor, PostRoutes.update);
postRouter.delete(Paths.Post.Delete, authenticateWithAuthor, PostRoutes.delete);

// Add UserRouter
apiRouter.use(Paths.Auth.Base, authRouter);
apiRouter.use(Paths.Post.Base, authenticate, postRouter);

// **** Export default **** //

export default apiRouter;
