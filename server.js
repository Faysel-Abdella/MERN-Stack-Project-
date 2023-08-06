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

app.get("/", (req, res, next) => {
  res.send("Hi world");
});

app.post("/", (req, res, next) => {
  // console.log(req);
  res.json({ message: "Data received", data: req.body });
});

app.listen(process.env.PORT || 5100, () => {
  console.log("server start");
});
