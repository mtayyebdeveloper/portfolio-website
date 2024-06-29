import express from "express";
import {
  signupController,
  loginController,
  userController,
  UpdateSingleUserById,
  updateSingleUserPassword
} from "../controllers/Auth.controller.js";
import {uploads} from '../middlewares/muterFiles.middleware.js'
import {homeController} from '../controllers/home.controller.js'
import { authUserMiddleware } from "../middlewares/authUser-middleware.js";
import {
  signupSchema,
  loginSchema,
  updateUserProfileSchema
} from "../validators/auth-validators.js";
import validateMiddleware from "../middlewares/validate-middleware.js";

const authRouter = express.Router();

authRouter.route("/").get(homeController);
authRouter.route("/login").post(validateMiddleware(loginSchema), loginController);
authRouter
  .route("/signup")
  .post(uploads.single("file"), signupController);

authRouter.route("/user").get(authUserMiddleware,userController);

authRouter.route("/updatepassword").patch(authUserMiddleware,updateSingleUserPassword);

authRouter.route("/update").patch(authUserMiddleware,uploads.single("file"),UpdateSingleUserById);
export { authRouter };
