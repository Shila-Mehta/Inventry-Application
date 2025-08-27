import { Router } from "express";
import { 
  getAllInventoryBooksByGenre, 
  getInventoryBooksByGenre, 
  getAllNewBooks 
} from "../db/queries.js";

const router = Router();

// ✅ Inventory + new_books route
router.get("/", async (req, res) => {
  try {
    const rows = await getAllInventoryBooksByGenre();

    // Group inventory books by genre
    const grouped = rows.reduce((acc, book) => {
      const genre = book.genre;
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(book);
      return acc;
    }, {});

    const result = Object.entries(grouped).map(([genre, books]) => ({
      [genre]: books
    }));

    // ✅ Fetch new_books from DB
    const newBooks = await getAllNewBooks();


    res.render("inventry", {
      books: result,
      newBooks,   // now comes from DB, not array file
      
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// ✅ Route for specific genre
router.get("/:genre", async (req, res) => {
  const genre = req.params.genre;
  const booksperGenre = await getInventoryBooksByGenre(genre);
  res.render("books", { books: booksperGenre, genre });
});

export default router;
