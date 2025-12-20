import path from "node:path";
import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../.env") });

const DATABASE_URL = process.env.DATABASE_URL || "";

export default defineConfig({
  earlyAccess: true,
  schema: path.join(__dirname, "schema.prisma"),
  migrate: {
    adapter: async () => {
      const pool = new Pool({ connectionString: DATABASE_URL });
      return new PrismaPg(pool);
    },
  },
});
