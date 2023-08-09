import express from "express";

const router = express.Router();

import { register, login, logout } from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middlewares/validationMiddleware.js";

router.post("/api/v1/auth/register", validateRegisterInput, register);

router.post("/api/v1/auth/login", validateLoginInput, login);

router.get("/api/v1/auth/logout", logout);

export default router;
