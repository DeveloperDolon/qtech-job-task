import { PrismaClient } from '#generated/prisma/index.js';
// import { neon } from '@neondatabase/serverless';
// import { PrismaNeon } from '@prisma/adapter-neon';


// Use a getter so neon() is never called until prisma is first accessed
// let _prisma: PrismaClient | null = null;

// function getPrisma(): PrismaClient {
//   if (!_prisma) {
//     const connectionString = process.env.DATABASE_URL;
//     if (!connectionString) throw new Error('DATABASE_URL is missing');
//     const sql = neon(connectionString);
//     const adapter = new PrismaNeon(sql);
//     _prisma = new PrismaClient({ adapter });
//   }
//   return _prisma;
// }

// // Export as a Proxy so `prisma.user.findMany()` etc. work transparently
// const prisma = new Proxy({} as PrismaClient, {
//   get(_target, prop) {
//     return getPrisma()[prop as keyof PrismaClient];
//   },
// });

const prisma = new PrismaClient();

export default prisma;
