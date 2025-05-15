const Book = require('../models/Book');
const Loan = require('../models/Loan');
const User = require('../models/User');
const emitter = require('../events/EventEmitter');
const Logger = require('../utils/Logger');

class LoanService {
  // Borrow a book
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

    // Emit event and log
    const user = await User.findById(userId);
    emitter.emit('bookBorrowed', book, user);
    Logger.log(`Book "${book.title}" borrowed by user ${user.email}`);

    return loan;
  }

  // Get user's active loans (not yet returned)
  static async getUserLoans(userId) {
    return Loan.find({ user: userId, dateReturned: { $exists: false } })
      .populate('book', 'title author genre __t');
  }

  // Return a book (mark loan as returned, make book available)
  static async returnBook(userId, loanId) {
    const loan = await Loan.findOne({ _id: loanId, user: userId });
    if (!loan) {
      throw new Error('Loan not found');
    }

    if (loan.dateReturned) {
      throw new Error('Book already returned');
    }

    // Mark loan as returned
    loan.dateReturned = new Date();
    await loan.save();

    // Mark book as available
    const book = await Book.findById(loan.book);
    if (book) {
      book.availability = true;
      await book.save();
    }

    Logger.log(`Book "${book.title}" returned by user ${userId}`);
    return loan;
  }
}

module.exports = LoanService;
