import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import express from "express";

const authRouter = express.Router();

authRouter.post('/api/auth/register', async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        // Verifier si l ' email existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email deja utilise' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creer l ' utilisateur
        const user = await User.create({
            userName, email, password: hashedPassword
        });

        // Generer le token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default authRouter;