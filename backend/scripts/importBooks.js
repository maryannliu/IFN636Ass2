const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Book = require('../models/Book');
const { adaptGoogleBook } = require('../adapters/googleBooksAdapter');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Utility to fetch books from Google Books API
const fetchBooks = async (query, type = 'PaperbackBook') => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${query}&maxResults=40`;
  const res = await axios.get(url);
  return res.data.items?.map(item => adaptGoogleBook(item, type)) || [];
};

// Genres to fetch by book type
const genreMap = {
  PaperbackBook: ['fiction', 'romance', 'history', 'horror'],
  Ebook: ['non-fiction', 'mystery', 'science', 'technology'],
  AudioBook: ['fantasy', 'biography', 'philosophy', 'self-help']
};

// Main function to import books
const importBooksByType = async () => {
  try {
    console.log('🚀 Running import:books script...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const allBooks = [];

    for (const [type, genres] of Object.entries(genreMap)) {
      for (const genre of genres) {
        console.log(`🔍 Fetching ${type}s in genre: ${genre}`);
        const books = await fetchBooks(genre, type);
        allBooks.push(...books);
      }
    }

    // Remove duplicates by ISBN
    const uniqueBooks = allBooks.filter(
      (book, index, self) => index === self.findIndex(b => b.isbn === book.isbn)
    );

    await Book.insertMany(uniqueBooks, { ordered: false });
    console.log(`✅ Successfully imported ${uniqueBooks.length} books across all genres.`);

    process.exit();
  } catch (err) {
    console.error('❌ Import failed:', err.message);
    process.exit(1);
  }
};

importBooksByType();
