import  pool  from "./pool.js";

// ========== GOOGLE BOOKS FETCH HELPERS ==========
const fetchBooks = async (apiUrl) => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.items || [];
};

const extractBookData = (apiBook) => {
  return {
    id: apiBook.id,
    title: apiBook.volumeInfo.title,
    subtitle: apiBook.volumeInfo.subtitle,
    description: apiBook.volumeInfo.description,
    page_count: apiBook.volumeInfo.pageCount || null,
    authors: apiBook.volumeInfo.authors || [],
    image_url: apiBook.volumeInfo.imageLinks?.thumbnail || null,
    preview_link: apiBook.volumeInfo.previewLink || null,
  };
};

// ========== INVENTORY BOOKS ==========
const insertInventoryBook = async (book, genre) => {
  const query = `
    INSERT INTO inventory_books (id, title, subtitle, description, page_count, authors, image_url, preview_link, genre)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    ON CONFLICT (id) DO NOTHING
  `;
  const values = [
    book.id,
    book.title,
    book.subtitle,
    book.description,
    book.page_count,
    book.authors,
    book.image_url,
    book.preview_link,
    genre,
  ];
  await pool.query(query, values);
};

const saveInventoryBooksByGenre = async (genre) => {
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${genre}&maxResults=5`;
  const booksFromApi = await fetchBooks(apiUrl);

  for (const apiBook of booksFromApi) {
    const extractedBook = extractBookData(apiBook);
    await insertInventoryBook(extractedBook, genre);
  }
};

const getInventoryBooksByGenre = async (genre) => {
  const result = await pool.query(
    "SELECT * FROM inventory_books WHERE genre = $1 LIMIT 5",
    [genre]
  );
  return result.rows;
};

const getAllInventoryBooksByGenre = async () => {
  const result = await pool.query("SELECT * FROM inventory_books");
  return result.rows;
};

// ========== NEW BOOKS ==========
const insertNewBook = async (book) => {
  const query = `
    INSERT INTO new_books (id, title, subtitle, description, page_count, authors, image_url, preview_link, genre)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    ON CONFLICT (id) DO NOTHING
  `;
  const values = [
    book.id,
    book.title,
    book.subtitle,
    book.description,
    book.page_count,
    book.authors,
    book.image_url,
    book.preview_link,
    book.genre,
  ];
  await pool.query(query, values);
};

const getAllNewBooks = async () => {
  const result = await pool.query("SELECT * FROM new_books");
  return result.rows;
};

const getNewBookById = async (id) => {
  const result = await pool.query("SELECT * FROM new_books WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

const deleteNewBook = async (id) => {
  const query = `DELETE FROM new_books WHERE id = $1`;
  await pool.query(query, [id]);
};

const updateNewBook = async (book) => {
  const query = `
    UPDATE new_books
    SET title=$2, subtitle=$3, description=$4, page_count=$5, authors=$6, image_url=$7, preview_link=$8, genre=$9
    WHERE id=$1
  `;
  const values = [
    book.id,
    book.title,
    book.subtitle,
    book.description,
    book.page_count,
    book.authors,
    book.image_url,
    book.preview_link,
    book.genre,
  ];
  await pool.query(query, values);
};

// ========== GENERAL BOOKS (old table) ==========
const getAllBooks = async () => {
  const result = await pool.query(`SELECT * FROM books`);
  return result.rows;
};

const getBookById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM inventory_books WHERE id=$1",
    [id]
  );
  return result.rows[0];
};

// ========== FAVORITES ==========
const addFavorite = async (bookId) => {
  const query = `INSERT INTO favorites (book_id) VALUES ($1) ON CONFLICT DO NOTHING`;
  await pool.query(query, [bookId]);
};

const getFavorites = async () => {
  const result = await pool.query("SELECT book_id FROM favorites");
  return result.rows;
};

const removeFavorite = async (bookId) => {
  const query = `DELETE FROM favorites WHERE book_id = $1`;
  await pool.query(query, [bookId]);
};

// ========== EXPORTS ==========
 export   {
  // inventory
  extractBookData,
  fetchBooks,
  insertInventoryBook,
  saveInventoryBooksByGenre,
  getAllInventoryBooksByGenre,
  getInventoryBooksByGenre,

  // new_books
  insertNewBook,
  getAllNewBooks,
  getNewBookById,
  deleteNewBook,
  updateNewBook,

  // general books
  getAllBooks,
  getBookById,

  // favorites
  addFavorite,
  getFavorites,
  removeFavorite,
};
