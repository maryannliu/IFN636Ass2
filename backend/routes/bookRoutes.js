const express = require('express');
const { getBooks } = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks); // GET /api/books

module.exports = router;
