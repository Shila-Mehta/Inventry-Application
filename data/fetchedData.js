export default async function fetchBooks(query, number = 5) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${number}`;
  const response = await fetch(url);
  const data = await response.json();
  const books = data.items || [];
  return books;
}
