const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../../generated/prisma");

const connectionString = process.env.DATABASE_URL;
const pool = globalThis.__skillBridgePgPool ?? new Pool({ connectionString });
const adapter = globalThis.__skillBridgePrismaAdapter ?? new PrismaPg(pool);
const prisma =
  globalThis.__skillBridgePrisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalThis.__skillBridgePgPool = pool;
  globalThis.__skillBridgePrismaAdapter = adapter;
  globalThis.__skillBridgePrisma = prisma;
}

module.exports = prisma;
