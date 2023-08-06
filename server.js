import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";

const app = express();

let jobs = [
  { id: nanoid(), company: "apple", position: "Front-end" },
  { id: nanoid(), company: "google", position: "Back-end" },
];

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

// GET ALL JOBS
app.get("/api/v1/jobs", (req, res, next) => {
  res.status(200).json({ jobs: jobs });
});

// CREATE JOB
app.post("/api/v1/jobs", (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(400)
      .json({ message: "Please provide the full information" });
  }
  const job = { id: nanoid(10), company: company, position, position };
  jobs.push(job);
  res.status(200).json({ job: job });
});

app.listen(process.env.PORT || 5100, () => {
  console.log("server start");
});
