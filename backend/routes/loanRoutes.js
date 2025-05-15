const express = require('express');
const { borrowBook } = require('../controllers/loanController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/borrow/:bookId', protect, borrowBook);

module.exports = router;
