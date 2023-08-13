import express from "express";

const router = express.Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
import { checkIfAdmin } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

router.get("/api/v1/users/current-user", getCurrentUser);

//Since only admin can see the app status
router.get("/api/v1/users/admin/app-stats", checkIfAdmin, getApplicationStats);

router.patch(
  "/api/v1/users/update-user",
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

export default router;
