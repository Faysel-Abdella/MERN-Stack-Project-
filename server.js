import express from "express";

const app = express();

// Parse any incomming json POST or PUT request and enable working with it
// as just a javascript object
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hi world");
});

app.post("/", (req, res, next) => {
  console.log(req);
  res.json({ message: "Data received", data: req.body });
});

app.listen(5100, () => {
  console.log("server start");
});
