const express = require('express');
const { getRandomBooks } = require('../controllers/bookController');

const router = express.Router();

router.get('/random', getRandomBooks);

module.exports = router;
