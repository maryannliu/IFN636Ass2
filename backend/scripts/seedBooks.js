const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const Book = require('../models/Book');

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedBooks = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing books
    await Book.deleteMany();
    console.log('🧹 Old books deleted');

    // Load books from sampleBooks.json in the same folder
    const dataPath = path.join(__dirname, 'sampleBooks.json');
    const books = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Insert books into DB
    await Book.insertMany(books);
    console.log(`✅ Inserted ${books.length} books successfully`);

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding books:', error.message);
    process.exit(1);
  }
};

seedBooks();

