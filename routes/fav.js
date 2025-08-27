import { Router } from "express";
import { 
  addFavorite, 
  removeFavorite, 
  getFavorites, 
  getBookById, 
  getNewBookById 
} from "../db/queries.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const favRows = await getFavorites();

    const FavBooks = await Promise.all(
      favRows.map(async (fav) => {
        let book = await getBookById(fav.book_id);
        if (!book) {
          book = await getNewBookById(fav.book_id);
        }
        return book;
      })
    );

    res.render("favBooks", { books: FavBooks.filter(Boolean) });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching favorite books");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let book = await getBookById(id);
    if (!book) {
      book = await getNewBookById(id);
    }

    if (!book) {
      return res.status(404).send("Book not found");
    }

    const favIds = await getFavorites();
    const isFav = favIds.some((b) => String(b.book_id) === String(id));

    res.render("bookDetail", { book, id: book.id, isFav });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching book detail");
  }
});

router.post("/add", async (req, res) => {
  try {
    await addFavorite(req.body.id);
    res.redirect("/favorites");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding favorite");
  }
});

router.post("/remove", async (req, res) => {
  try {
    await removeFavorite(req.body.id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error removing favorite");
  }
});

export default router;
