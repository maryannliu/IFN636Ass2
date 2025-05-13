const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { Book, PaperbackBook, eBook, AudioBook } = require('../models/Books');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('Connection failed', err));

// Read and parse JSON file
const rawData = fs.readFileSync(path.join(__dirname, '../data/seedBooks.json'));
const rawBooks = JSON.parse(rawData);

// Convert raw books into Mongoose model instances
const bookInstances = rawBooks.map((book) => {
  const { type, ...props } = book;
  switch (type) {
    case 'PaperbackBook': return new PaperbackBook(props);
    case 'eBook': return new eBook(props);
    case 'AudioBook': return new AudioBook(props);
    default: return null;
  }
}).filter(book => book !== null);

// Seed function
const seedBooks = async () => {
  try {
    await Book.deleteMany(); // Optional: Clear existing data
    await Book.insertMany(bookInstances);
    console.log('✅ Books seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding books:', err);
    process.exit(1);
  }
};

seedBooks();
