const express = require('express');
const LoanController = require('../controllers/loanController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/borrow/:bookId', protect, LoanController.borrowBook);
router.get('/my', protect, LoanController.getMyLoans);
router.put('/return/:loanId', protect, LoanController.returnBook);

module.exports = router;
