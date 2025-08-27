import { Router } from "express";
import randomBook from "../utils/randomBook.js";
import { getAllInventoryBooksByGenre } from "../db/queries.js";

const router = Router();

router.get("/", async (req, res) => {
  const result = await getAllInventoryBooksByGenre();
  const book = await randomBook(result);
  res.render("home", { book });
});

export default router;
