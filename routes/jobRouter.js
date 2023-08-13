import express from "express";

import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";

import {
  validateJobInput,
  validateIdParam,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/api/v1/jobs", getAllJobs);

router.post("/api/v1/jobs", validateJobInput, createJob);

router.get("/api/v1/jobs/stats", showStats);

router.get("/api/v1/jobs/:id", validateIdParam, getJob);

router.patch("/api/v1/jobs/:id", validateJobInput, validateIdParam, updateJob);

router.delete("/api/v1/jobs/:id", validateIdParam, deleteJob);

export default router;
