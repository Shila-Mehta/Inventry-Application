import { Router } from "express";
import { getBookById, getFavorites,getNewBookById } from "../db/queries.js";

const router = Router();

// Existing inventory_books route
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await getBookById(id);
    const favIds = await getFavorites();
    const isFav = favIds.some((b) => b.book_id === id) || false;

    res.render("bookDetail", { book, id, isFav });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).send("Error fetching book");
  }
});

// Redirect to preview link
router.get("/read/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check normal books first
    let book = await getBookById(id);

    // If not found, check new_books
    if (!book) {
      book = await getNewBookById(id);
    }

    if (!book || !book.preview_link) {
      return res.status(404).send("Preview link not available for this book");
    }

    res.redirect(book.preview_link);

  } catch (error) {
    console.error("Error redirecting to preview:", error);
    res.status(500).send("Error redirecting");
  }
});

export default router;
