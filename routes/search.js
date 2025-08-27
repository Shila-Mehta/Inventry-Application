import { Router } from "express";
import searchBooksByAuthorORTitle from "../data/fetchBooksByAuthor&Title.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("form");
});

router.post("/", async (req, res) => {
  const searchedBooks = await searchBooksByAuthorORTitle(req.body);
  res.render("books", { books: searchedBooks });
});

export default router;
