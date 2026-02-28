import prisma from "#config/prisma.js";
import * as bcrypt from "bcryptjs";
import config from "#config/index.js";
import "dotenv/config";

async function main() {
  console.log("🌱 Seeding database...");
console.log("DATABASE_URL:", process.env.DATABASE_URL);
  const password = await bcrypt.hash("password123", Number(config.salt_round));

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin User",
      password: password,
    },
  });

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
