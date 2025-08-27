import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Routers
import indexRouter from "./routes/index.js";
import searchRouter from "./routes/search.js";
import booksRouter from "./routes/books.js";
import bookRouter from "./routes/book.js";
import newBooksRouter from "./routes/newBooks.js";
import favRouter from "./routes/fav.js";



// Fix __dirname and __filename in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());





// Routers
app.use("/", indexRouter);
app.use("/search", searchRouter);
app.use("/books", booksRouter);
app.use("/book", bookRouter);
app.use("/newBook", newBooksRouter);
app.use("/fav", favRouter);

const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) console.error(error);
  console.log(`The app is running at port ${PORT}`);
});
