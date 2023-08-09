import express from "express";

const router = express.Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userController.js";

router.get("/api/v1/users/current-user", getCurrentUser);

//Since only admin can see the app status
router.get("/api/v1/users/admin/app-stats", getApplicationStats);

router.patch("/api/v1/users/update-user", updateUser);

export default router;
