import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.PUBLIC_DB_URL,
  ssl: { rejectUnauthorized: false } // ✅ required for Neon
});

export default pool;
