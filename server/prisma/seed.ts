import dotenv from "dotenv";
import prisma from "#config/prisma.js";
import * as bcrypt from "bcryptjs";
import config from "#config/index.js";

dotenv.config();

async function main() {
  console.log("🌱 Seeding database...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  // Test if prisma is actually connected
  try {
    const password = await bcrypt.hash("password123", Number(config.salt_round) || 10);

    await prisma.user.create({
      data: {
        email: "admin123@example.com",
        name: "Admin User",
        password: password,
      },
    });
    console.log("✅ Seeding completed!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
