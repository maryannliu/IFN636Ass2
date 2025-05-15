const LoanService = require('../services/LoanService');

exports.borrowBook = async (req, res) => {
  try {
    const userId = req.user.id; // Comes from authMiddleware
    const bookId = req.params.bookId;

    const loan = await LoanService.borrowBook(userId, bookId);
    res.status(201).json({
      message: 'Book borrowed successfully',
      loan
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
