import express from "express";
import validateMiddleware from "../middlewares/validate-middleware.js";
import { contactController } from "../controllers/contact.controller.js";
import { contactFormSchema } from "../validators/auth-validators.js";

const contactRouter =express.Router()
contactRouter
  .route("/contact")
  .post(validateMiddleware(contactFormSchema), contactController);

export {contactRouter};
