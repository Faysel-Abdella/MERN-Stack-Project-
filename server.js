import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
const app = express();

// Parse any incomming json POST or PUT request and enable working with it
// as just a javascript object
app.use(express.json());

//If i am not in development phase (if i am in production phase), i don't
//to log any request deatils(only if i'm developing i want to log details)
if (process.env.NODE_ENV === "development") {
  //When you deploy this app the deployment platform will change the NODE_ENV to
  //"production" so the following line will not excute
  app.use(morgan("dev"));
}

import jobRouter from "./routes/jobRouter.js";

app.use(jobRouter);

//404 middleware
app.use("*", (req, res, next) => {
  //'*' stands for all routes that do not match the all the above routes
  res.status(404).json({ message: "page not found" });
});

//Error middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong in database" });
});

app.listen(process.env.PORT || 5100, () => {
  console.log("server start");
});
