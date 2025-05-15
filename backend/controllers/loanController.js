const LoanService = require('../services/LoanService');

class LoanController {
  // POST /api/loans/borrow/:bookId
  static async borrowBook(req, res) {
    const userId = req.user.id;
    const bookId = req.params.bookId;

    try {
      const loan = await LoanService.borrowBook(userId, bookId);
      res.status(201).json({
        message: 'Book borrowed successfully',
        loan
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET /api/loans/my
  static async getMyLoans(req, res) {
    const userId = req.user.id;

    try {
      const loans = await LoanService.getUserLoans(userId);
      res.status(200).json(loans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // PUT /api/loans/return/:loanId
  static async returnBook(req, res) {
    const userId = req.user.id;
    const loanId = req.params.loanId;

    try {
      const loan = await LoanService.returnBook(userId, loanId);
      res.status(200).json({
        message: 'Book returned successfully',
        loan
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = LoanController;
