import express from "express";

const router = express.Router();

import { register, login } from "../controllers/authController.js";
import { validateRegisterInput } from "../middlewares/validationMiddleware.js";

router.post("/register", validateRegisterInput, register);
router.post("/login", login);

export default router;
