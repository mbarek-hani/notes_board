import mongoose from "mongoose";
import { body, param } from "express-validator";

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
			enum: ["user", "admin"],
			default: "user",
		},
	},
	{ timestamps: true },
);

export default mongoose.model("User", userSchema);

// validation
export const createUserValidator = [
	body("userName")
		.notEmpty()
		.withMessage("Username is required")
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters"),

	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Invalid email format"),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters"),

	body("role")
		.optional()
		.isIn(["user", "admin"])
		.withMessage("Role must be either user or admin"),
];

export const updateUserValidator = [
	param("id").isMongoId().withMessage("Invalid user ID"),

	body("userName")
		.optional()
		.notEmpty()
		.withMessage("Username cannot be empty")
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters"),

	body("email")
		.optional()
		.notEmpty()
		.withMessage("Email cannot be empty")
		.isEmail()
		.withMessage("Invalid email format"),

	body("password")
		.optional()
		.notEmpty()
		.withMessage("Password cannot be empty")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters"),

	body("role")
		.optional()
		.isIn(["user", "admin"])
		.withMessage("Role must be either user or admin"),
];

export const loginUserValidator = [
	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Invalid email format"),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters"),
];
