import express, { json } from "express";
import "dotenv/config";
import mongoDBconnection from "./mongodb/dbconnection.js";
import { errorThrowingMiddleware } from './middlewares/errorThrowing-middleware.js'
import { authRouter } from "./routers/auth-router.js";
import { contactRouter } from "./routers/contact-router.js";
import { sercicesRouter } from './routers/services-router.js'
import { adminRouter } from "./routers/admin-router.js";
import { getallpostsRouter } from './routers/posts-router.js'
import { portfolioRouter } from './routers/portfolio-router.js'
import cors from "cors";

const app = express();

const options = {
  origin: process.env.FRONTEND_SITE_NAME,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(options));

app.use(json());

mongoDBconnection();

app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/user", sercicesRouter)
app.use("/api/admin", adminRouter);
app.use("/api/user", getallpostsRouter)
app.use("/api/user", portfolioRouter)

app.use(errorThrowingMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Your app is started........ port is:", process.env.PORT);
});
