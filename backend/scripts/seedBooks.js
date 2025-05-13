const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Book, PaperbackBook, eBook, AudioBook } = require('../models/Books');

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('Connection failed', err));

const seedBooks = async () => {
  try {
    await Book.deleteMany(); // optional
    const books = [
      new PaperbackBook({ isbn: '101', title: 'Learn JS', author: 'Jane', genre: 'Tech', pages: 300 }),
      new eBook({ isbn: '102', title: 'Async Deep Dive', author: 'Tom', genre: 'Programming', pages: 150, fileSize: 2 }),
      new AudioBook({ isbn: '103', title: 'Focus Mode', author: 'Nina', genre: 'Self-Help', fileSize: 4, narrator: 'Alex', durationInMins: 180 }),
    ];
    await Book.insertMany(books);
    console.log('✅ Books seeded');
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

seedBooks();
