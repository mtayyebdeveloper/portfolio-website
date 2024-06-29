import {
  getAllUsersController,
  getAllContactsController,
  getAdminController,
  PostsController,
  deleteUserbyID,
  deleteContactbyID,
  getAllPostsContainer,
  deletePostsbyID,
  updateAllUsersData,
  sendPostsDataController,
  UpdatePostsController,
} from "../controllers/admin.controller.js";
import express from "express";
import { authUserMiddleware } from "../middlewares/authUser-middleware.js";
import { adminMiddleware } from "../middlewares/admin-middleware.js";
import validateMiddleware from "../middlewares/validate-middleware.js";
import { adminUpdateUsersSchema } from "../validators/auth-validators.js";
import {uploads} from '../middlewares/muterFiles.middleware.js'

const adminRouter = express.Router();


adminRouter
  .route("/users")
  .get(authUserMiddleware, adminMiddleware, getAllUsersController);
adminRouter
  .route("/contacts")
  .get(authUserMiddleware, adminMiddleware, getAllContactsController);
adminRouter
  .route("/isadmin")
  .get(authUserMiddleware, adminMiddleware, getAdminController);
adminRouter
  .route("/post")
  .post(authUserMiddleware, adminMiddleware,uploads.single("file"), PostsController);
adminRouter
  .route("/delete/users/:id")
  .delete(authUserMiddleware, adminMiddleware, deleteUserbyID);
adminRouter
  .route("/delete/posts/:id")
  .delete(authUserMiddleware, adminMiddleware, deletePostsbyID);
adminRouter
  .route("/delete/contacts/:id")
  .delete(authUserMiddleware, adminMiddleware, deleteContactbyID);
adminRouter
  .route("/posts")
  .get(authUserMiddleware, adminMiddleware, getAllPostsContainer);

adminRouter
  .route("/update/users/:id")
  .patch(
    authUserMiddleware,
    adminMiddleware,
    validateMiddleware(adminUpdateUsersSchema),
    updateAllUsersData
  );

adminRouter
  .route("/update/posts/:id")
  .patch(authUserMiddleware, adminMiddleware, UpdatePostsController);

adminRouter
  .route("/send/posts/:id")
  .get(authUserMiddleware, adminMiddleware, sendPostsDataController);

export { adminRouter };
