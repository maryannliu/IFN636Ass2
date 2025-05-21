const express = require('express');
const BookController = require('../controllers/bookController');

const router = express.Router();

router.get('/random', BookController.getRandomBooks);
router.get('/genres', BookController.getAllGenres);
router.get('/genre', BookController.getBooksByGenre);

module.exports = router;
