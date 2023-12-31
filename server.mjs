import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes.js";
import cloudinary from "cloudinary";

// production(deployment) tools
import helmet from "helmet";

const app = express();

// Parse any incoming json POST or PUT request and enable working with it
// as just a javascript object
app.use(express.json());
// Parse the cookie from any incoming request
app.use(cookieParser());

//If i am not in development phase (if i am in production phase), i don't
//to log any request details(only if i'm developing i want to log details)
app.use(morgan("combined"));
if (process.env.NODE_ENV === "development") {
  //When you deploy this app the deployment platform will change the NODE_ENV to
  //"production" so the following line will not execute
  app.use(morgan("dev"));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./public")));

// routes import
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
//middleware import
import { authenticateUser } from "./middlewares/authMiddleware.js";

// Routes

app.use(authRouter);
app.use(authenticateUser, jobRouter);
app.use(authenticateUser, userRouter);

app.get("*", (req, res, next) => [
  res.sendFile(path.resolve(__dirname, "./public", "index.html")),
]);

app.use(helmet());

//404 middleware
app.use("*", (req, res, next) => {
  //'*' stands for all routes that do not match the all the above routes
  res.status(404).json({ message: "page not found" });
});

//Error middleware,
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong";
  res.status(statusCode).json({ message: message });
});

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(process.env.PORT || 5100, () => {
    console.log("server running... :)");
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}
