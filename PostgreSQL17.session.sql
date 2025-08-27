-- Ensure pgcrypto exists for UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop tables first if they exist
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS new_books;
DROP TABLE IF EXISTS inventory_books;

-- Create inventory_books
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

-- Create new_books
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

-- Create favorites
CREATE TABLE favorites(
    id SERIAL PRIMARY KEY,
    book_id TEXT UNIQUE
);

-- Insert sample data into new_books
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

-- Check data
SELECT * FROM inventory_books;
SELECT * FROM favorites;
SELECT * FROM new_books;



