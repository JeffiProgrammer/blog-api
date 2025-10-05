import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Register the user
export async function register(_req: Request, res: Response): Promise<Response> {
	try {
		const { name, email, password } = _req.body as {
			name: string;
			email: string;
			password: string;
		};

		if (!name || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ message: "Email already registered" });
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const newUser = await User.create({ name, email, passwordHash });

		const token = jwt.sign({ userId: String(newUser._id) }, process.env.JWT_SECRET as string, {
			expiresIn: "7d",
		});

		return res.status(201).json({ token, newUser: { id: String(newUser._id), name, email } });
	} catch (_error) {
		return res.status(500).json({ message: "Registration failed" });
	}
}

// Login the User
export async function login(_req: Request, res: Response): Promise<Response> {
	try {
		const { email, password } = _req.body as { email: string; password: string };
		if (!email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const passwordIsValid = await bcrypt.compare(password, user.passwordHash);
		if (!passwordIsValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ userId: String(user._id), name: user.name, email: user.email },
			process.env.JWT_SECRET as string,
			{ expiresIn: "7d" },
		);

		return res.status(200).json({
			token,
			user: { id: String(user._id), name: user.name, email: user.email },
		});
	} catch (_error) {
		return res.status(500).json({ message: "Login failed" });
	}
}

export default { register, login };
