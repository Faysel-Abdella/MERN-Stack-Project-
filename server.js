import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes.js";
const app = express();

// Parse any incoming json POST or PUT request and enable working with it
// as just a javascript object
app.use(express.json());

//If i am not in development phase (if i am in production phase), i don't
//to log any request details(only if i'm developing i want to log details)
if (process.env.NODE_ENV === "development") {
  //When you deploy this app the deployment platform will change the NODE_ENV to
  //"production" so the following line will not execute
  app.use(morgan("dev"));
}

import jobRouter from "./routes/jobRouter.js";
import { validateTest } from "./middlewares/validationMiddleware.js";

// Routes

app.post("/api/v1/test", validateTest, (req, res, next) => {
  const { name } = req.body;
  res.json({ message: `Hi, ${name} ` });
});

app.use(jobRouter);

//404 middleware
app.use("*", (req, res, next) => {
  //'*' stands for all routes that do not match the all the above routes
  res.status(404).json({ message: "page not found" });
});

//Error middleware
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
