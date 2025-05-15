const mongoose = require('mongoose');

// Common schema options
const options = { discriminatorKey: '__t', timestamps: true };

// Base schema
const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: String,
  genre: String,
  availability: { type: Boolean, default: true },
  type: { 
    type: String,
    enum: ['PaperbackBook', 'Ebook', 'AudioBook'],
    required: true
  }
}, options);

// Create base model
const Book = mongoose.model('Book', bookSchema);

// Discriminator: PaperbackBook
Book.discriminator('PaperbackBook',
  new mongoose.Schema({
    pages: { type: Number, required: true }
  }, options)
);

// Discriminator: Ebook
Book.discriminator('Ebook',
  new mongoose.Schema({
    pages: Number,
    fileSize: Number
  }, options)
);

// Discriminator: AudioBook
Book.discriminator('AudioBook',
  new mongoose.Schema({
    fileSize: Number,
    narrator: String,
    durationInMins: Number
  }, options)
);

module.exports = Book;
