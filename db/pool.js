// db/pool.js
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const DB_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PUBLIC_DB_URL
    : process.env.LOCAL_DB_URL;

console.log(DB_URL);

const pool = new Pool({ connectionString: DB_URL });

export default pool;
