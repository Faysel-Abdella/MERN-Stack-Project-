import express from "express";

import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.get("/api/v1/jobs", getAllJobs);

router.post("/api/v1/jobs", createJob);

router.get("/api/v1/jobs/:id", getJob);

router.patch("/api/v1/jobs/:id", updateJob);

router.delete("/api/v1/jobs/:id", deleteJob);

router.get("/api/v1/jobs", getAllJobs);

export default router;
