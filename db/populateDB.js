// setupDB.js
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

const DB_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PUBLIC_DB_URL
    : process.env.LOCAL_DB_URL;

const client = new Client({
  connectionString: DB_URL,
});

async function setupDatabase() {
  try {
    await client.connect();
    console.log("✅ Connected to database");

    // Ensure pgcrypto exists
    await client.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    // Drop tables if they exist
    await client.query(`DROP TABLE IF EXISTS favorites;`);
    await client.query(`DROP TABLE IF EXISTS new_books;`);
    await client.query(`DROP TABLE IF EXISTS inventory_books;`);

    // Create inventory_books
    await client.query(`
      CREATE TABLE inventory_books (
        id TEXT PRIMARY KEY,
        title TEXT,
        subtitle TEXT,
        description TEXT,
        page_count INTEGER,
        authors TEXT[],
        image_url VARCHAR(255),
        preview_link VARCHAR(255),
        genre TEXT NOT NULL
      );
    `);

    // Create new_books
    await client.query(`
      CREATE TABLE new_books (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        subtitle TEXT,
        description TEXT,
        page_count INTEGER,
        authors TEXT[],
        image_url TEXT,
        preview_link TEXT,
        genre TEXT NOT NULL
      );
    `);

    // Create favorites
    await client.query(`
      CREATE TABLE favorites (
        id SERIAL PRIMARY KEY,
        book_id TEXT UNIQUE
      );
    `);

    // Insert sample data
    await client.query(`
      INSERT INTO new_books (title, description, page_count, authors, image_url, preview_link, genre)
      VALUES (
        'Harry Potter and the Sorcerer''s Stone',
        'A young boy discovers he is a wizard on his 11th birthday and attends Hogwarts School of Witchcraft and Wizardry.',
        309,
        ARRAY['J.K. Rowling'],
        'https://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1',
        'https://books.google.com/books?id=wrOQLV6xB-wC&dq=harry+potter&hl=en&sa=X&redir_esc=y',
        'Fantasy'
      );
    `);

    console.log("✅ Tables created and sample data inserted");
  } catch (err) {
    console.error("❌ Error setting up database:", err);
  } finally {
    await client.end();
    console.log("🔒 Database connection closed");
  }
}

setupDatabase();
