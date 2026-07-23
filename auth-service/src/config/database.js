// import prisma from "./prisma.js";

// export async function connectDB() {
//   try {
//     await prisma.$connect();
//     console.log("✅ PostgreSQL connected");
//   } catch (error) {
//     console.error("❌ Database connection failed");
//     console.error(error);
//     process.exit(1);
//   }
// }

// export async function disconnectDB() {
//   try {
//     await prisma.$disconnect();
//     console.log("Database disconnected");
//   } catch (error) {
//     console.error("Error disconnecting database:", error);
//   }
// }