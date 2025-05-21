const Book = require('../models/Book');
const Loan = require('../models/Loan');
const User = require('../models/User');
const emitter = require('../events/EventEmitter');
const Logger = require('../utils/Logger');

class LoanService {
  static async borrowBook(userId, bookId) {
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }

    if (!book.availability) {
      throw new Error('Book is already borrowed');
    }

    // Update availability
    book.availability = false;
    await book.save();

    // Create loan
    const loan = await Loan.create({
      user: userId,
      book: book._id
    });

    // Emit bookBorrowed event
    const user = await User.findById(userId);
    emitter.emit('bookBorrowed', book, user);

    // Log the action
    Logger.log(`Book "${book.title}" borrowed by user ${user.email}`);

    return loan;
  }
}

module.exports = LoanService;
