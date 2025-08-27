export default function randomBook(books) {
  const index = Math.floor(Math.random() * books.length);
  return books[index];
}
