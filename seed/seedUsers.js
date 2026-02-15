import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export async function seedUsers(count = 5) {
  const users = [];

  for (let i = 0; i < count; i++) {
    const user = await User.create({
      userName: faker.internet.username(),
      email: faker.internet.email().toLowerCase(),

      // 🔥 all users have same password for testing
      password: await bcrypt.hash("123456", 10),

      role: i === 0 ? "admin" : "user",
    });

    users.push(user);
  }

  console.log(`✅ Seeded ${count} users`);
  return users;
}
