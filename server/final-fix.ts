// final-fix-http.ts
import { neon } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from "./src/generated/prisma/index.js"; 

async function run() {
  const url = "postgresql://neondb_owner:npg_WsLu1GBZUqf2@ep-lucky-flower-aiuc5q9p.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require";
  
  const sql = neon(url);
  // In the latest version, PrismaNeon can take the neon() fetch client
  const adapter = new PrismaNeon(sql as any); 
  const prisma = new PrismaClient({ adapter });

  console.log("🌐 Testing HTTP Fetch mode...");
  try {
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    console.log("🔗 Connection Success via HTTP:", result);
  } catch (e: any) {
    console.log("❌ HTTP Error:", e.message);
  }
}
run();
