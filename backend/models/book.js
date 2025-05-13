const mongoose = require('mongoose');

// Common base schema for all books
const options = { discriminatorKey: '__t', timestamps: true };

const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: String,
  genre: String,
  availability: { type: Boolean, default: true }
}, options);

// Base model
const Book = mongoose.model('Book', bookSchema);

// Specialized schemas (inherited types)

const PaperbackBook = Book.discriminator('PaperbackBook',
  new mongoose.Schema({
    pages: { type: Number, required: true }
  }, options)
);

const eBook = Book.discriminator('eBook',
  new mongoose.Schema({
    pages: Number,
    fileSize: Number
  }, options)
);

const AudioBook = Book.discriminator('AudioBook',
  new mongoose.Schema({
    fileSize: Number,
    narrator: String,
    durationInMins: Number
  }, options)
);

module.exports = {
  Book,
  PaperbackBook,
  eBook,
  AudioBook
};
