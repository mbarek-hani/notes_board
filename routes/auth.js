import express from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
	me,
} from "../controllers/usersController.js";
import {
	validatorMiddleware,
	authenticateToken,
} from "../middlewares/index.js";
import { createUserValidator, loginUserValidator } from "../models/User.js";

const authRouter = express.Router();

authRouter.post(
	"/register",
	createUserValidator,
	validatorMiddleware,
	registerUser,
);

authRouter.post("/login", loginUserValidator, validatorMiddleware, loginUser);

authRouter.post("/me", authenticateToken, me);
authRouter.post("/logout", authenticateToken, logoutUser);

export default authRouter;
