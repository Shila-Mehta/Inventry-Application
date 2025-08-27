import { Router } from "express";
import crypto from "crypto";
import { insertNewBook, getAllNewBooks, getNewBookById,getFavorites } from "../db/queries.js";

const router = Router();

const generateId = () => crypto.randomUUID(); // generates a unique ID


// Show add form
router.get("/add", (req, res) => {
  res.render("BookAddForm");
});

// Handle form submission
router.post("/add", async (req, res) => {
  try {
    const book = {
      id: generateId(),
      title: req.body.title,
      subtitle: req.body.subtitle || null,
      description: req.body.description || null,
      page_count: req.body.page_count || null,
      authors: req.body.authors ? [req.body.authors] : [],
      image_url: req.body.image_url || null,
      preview_link: req.body.preview_link || null,
      genre: req.body.genre || "Unknown",
    };

    await insertNewBook(book);
    res.status(200).redirect("/newBook"); // redirect to all new books
  } catch (error) {
    console.error("Error inserting new book:", error);
    res.status(500).send("Error saving book");
  }
});

// Show all new books
router.get("/", async (req, res) => {
  try {
    const books = await getAllNewBooks();
    res.render("newBook", { books });
  } catch (error) {
    console.error("Error fetching new books:", error);
    res.status(500).send("Error fetching books");
  }
});


router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await getNewBookById(id);

    if (!book) return res.status(404).send("Book not found");

    // Check if this book is in favorites
    const favIds = await getFavorites();
    const isFav = favIds.some((b) => String(b.book_id) === String(id)) || false;

    res.render("bookDetail", { book, id: book.id, isFav });
  } catch (error) {
    console.error("Error fetching new book:", error);
    res.status(500).send("Error fetching book");
  }
});
export default router;
