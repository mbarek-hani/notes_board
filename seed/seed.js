import mongoose from "mongoose";
import User from "../models/User.js";
import Note from "../models/Note.js";

import { seedUsers } from "./seedUsers.js";
import { seedNotes } from "./seedNotes.js";

// ✅ Get number from command line
// npm run seed -- 100
const notesCount = Number(process.argv[2]) || 50;
const usersCount = Number(process.argv[3]) || 10;

const MONGO_URI = process.env.DB_URI;
console.log(MONGO_URI);

async function runSeed() {
	try {
		console.log("⏳ Connecting...");
		await mongoose.connect(MONGO_URI);

		console.log("🧹 Clearing old data...");
		await User.deleteMany();
		await Note.deleteMany();

		console.log("👤 Seeding users...");
		const users = await seedUsers(usersCount);
		console.log(users);

		console.log("📝 Seeding notes...");
		await seedNotes(users, notesCount);

		console.log("🎉 DONE! Database seeded successfully.");
		process.exit();
	} catch (err) {
		console.error("❌ Seeder error:", err);
		process.exit(1);
	}
}

runSeed();
