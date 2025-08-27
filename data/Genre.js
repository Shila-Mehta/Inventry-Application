import { saveInventoryBooksByGenre } from "../db/queries.js";

const genres = [
  "fantasy",
  "science fiction",
  "mystery",
  "thriller",
  "romance",
  "self help",
  "biography",
  "poetry",
  "children",
];

const saveAllInventoryBooks = async () => {
  for (const genre of genres) {
    await saveInventoryBooksByGenre(genre);
  }
};

saveAllInventoryBooks();
