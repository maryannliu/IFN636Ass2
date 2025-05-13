const express = require('express');
const { getRandomBooks, getAllGenres, getBooksByGenre } = require('../controllers/bookController');

const router = express.Router();

router.get('/random', getRandomBooks);
router.get('/genres', getAllGenres);       
router.get('/by-genre', getBooksByGenre);  


module.exports = router;
