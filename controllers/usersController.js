import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Get All Users
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		const response = users.map((u) => ({
			_id: u._id,
			userName: u.userName,
			email: u.email,
			role: u.role,
		}));
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Get User By ID
export const getUserById = async (req, res) => {
	try {
		const user = await User.findOne({
			_id: req.params.id,
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// register User
export const registerUser = async (req, res) => {
	try {
		const { email, userName, password } = req.body;
		const existingUser = await User.findOne({
			$or: [{ email }, { userName }],
		});

		if (existingUser) {
			if (existingUser.email === email) {
				return res.status(400).json({ message: "Email already exists" });
			}

			if (existingUser.userName === userName) {
				return res.status(400).json({ message: "Username already exists" });
			}
		}

		// Hasher le mot de passe
		const hashedPassword = await bcrypt.hash(password, 10);

		// Creer l ' utilisateur
		const user = await User.create({
			userName,
			email,
			password: hashedPassword,
		});

		// Generer le token
		const token = jwt.sign(
			{ id: user._id, email: user.email, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "24h" },
		);

		res.status(201).json({
			success: true,
			token,
			user: {
				id: user._id,
				userName: user.userName,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
// Login User
export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Trouver l’utilisateur
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ error: "Email ou mot de passe incorrect" });
		}

		// Vérifier le mot de passe
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ error: "Email ou mot de passe incorrect" });
		}

		// Générer le token
		const token = jwt.sign(
			{ id: user._id, email: user.email, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "24h" },
		);

		res.json({
			success: true,
			token,
			user: {
				id: user._id,
				userName: user.userName,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update User
export const updateUserById = async (req, res) => {
	try {
		const { email, userName, password } = req.body;
		const existingUser = await User.findOne({
			_id: { $ne: req.params.id },
			$or: [{ email }, { userName }],
		});

		if (existingUser) {
			if (existingUser.email === email) {
				return res.status(400).json({ message: "Email already exists" });
			}

			if (existingUser.userName === userName) {
				return res.status(400).json({ message: "Username already exists" });
			}
		}
		// Hasher le mot de passe
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				...req.body,
				password: hashedPassword,
			},
			{ new: true },
		);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Delete User
export const deleteUserById = async (req, res) => {
	try {
		const user = await User.findOneAndDelete({
			_id: req.params.id,
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
