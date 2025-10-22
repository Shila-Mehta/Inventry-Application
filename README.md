## 📚 Book Inventory Application

A full-stack web application built with Node.js, Express, PostgreSQL, and EJS that allows users to browse, search, and manage books. The app integrates with the Google Books API to fetch live book data and provides features like favorites, genre/author filtering, and daily book recommendations.

## Key Features

Browse and search books by title or author

Fetch real-time book data using Google Books API

Filter books by genre or author

Display a daily book recommendation

Mark and view favorite books

Fully responsive UI

## Tech Stack

Backend: Node.js, Express.js

Frontend: HTML, CSS, EJS templates

Database: PostgreSQL (Neon)

API: Google Books API

Tools & Libraries: pg, dotenv, nodemon


## Project Structure
```
└── 📁Inventery Application
    └── 📁controllers
    └── 📁data
        ├── fetchBooksByAuthor&Title.js
        ├── fetchedData.js
        ├── Genre.js
    └── 📁db
        ├── pool.js
        ├── populateDB.js
        ├── queries.js
    └── 📁public
        ├── BookAddForm.css
        ├── bookDetail.css
        ├── books.css
        ├── books.jpg
        ├── dailyBook.css
        ├── fav.css
        ├── form.css
        ├── genre.css
        ├── header.css
        ├── hero.css
        ├── inventry.css
        ├── panel.css
        ├── search.png
    └── 📁routes
        ├── book.js
        ├── books.js
        ├── fav.js
        ├── index.js
        ├── newBooks.js
        ├── search.js
    └── 📁utils
        ├── randomBook.js
    └── 📁views
        ├── BookAddForm.ejs
        ├── bookDetail.ejs
        ├── books.ejs
        ├── DailyBook.ejs
        ├── favBooks.ejs
        ├── form.ejs
        ├── genre.ejs
        ├── header.ejs
        ├── hero.ejs
        ├── home.ejs
        ├── inventry.ejs
        ├── newBook.ejs
        ├── panel.ejs
    ├── .env
    ├── .gitignore
    ├── app.js
    ├── package-lock.json
    ├── package.json
    └── PostgreSQL17.session.sql
```

## Why This Project?

This project demonstrates my ability to build end-to-end web applications with both backend and frontend integration, showcasing practical skills for real-world development roles.

It highlights:

Backend & Database Skills: Node.js + Express with PostgreSQL for storing and retrieving data.

API Integration: Fetches live data from Google Books API.

Frontend Development: Dynamic pages with EJS templates and responsive CSS.

Problem-Solving & UX: Search, filtering, favorites, and daily recommendations.


## Installation & Setup

Clone the repository

git clone https://github.com/Shila-Mehta/Inventry-Application.git
cd Inventery Application


# Install dependencies

npm install


# Populate the database (if needed)

node db/populateDB.js


# Start the application

npm start


# Open in browser:

http://localhost:3000



## Usage

Browse books and daily recommendations

Search by title or author

Filter books by genre

Add new books to the database

Save and view favorite books


## Future Improvements

User authentication and personalized profiles

Edit and delete books functionality

Ratings and reviews for books

Display book cover images from API

Automate database seeding for deployment

