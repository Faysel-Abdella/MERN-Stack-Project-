import express from "express";

import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

import { validateJobInput } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/api/v1/jobs", getAllJobs);

router.post("/api/v1/jobs", validateJobInput, createJob);

router.get("/api/v1/jobs/:id", getJob);

router.patch("/api/v1/jobs/:id", validateJobInput, updateJob);

router.delete("/api/v1/jobs/:id", deleteJob);

export default router;
