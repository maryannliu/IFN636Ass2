const { Book } = require('../models/Books');

// @desc    Get random books
// @route   GET /api/books/random
// @access  Public
const getRandomBooks = async (req, res) => {
  const { limit = 6, genre, type } = req.query;

  const match = {};
  if (genre) match.genre = genre;
  if (type) match.__t = type;

  try {
    const books = await Book.aggregate([
      { $match: match },
      { $sample: { size: parseInt(limit) } }
    ]);

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch random books', error: error.message });
  }
};


// Get all distinct genres
const getAllGenres = async (req, res) => {
  try {
    const genres = await Book.distinct('genre');
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch genres', error: error.message });
  }
};

const getBooksByGenre = async (req, res) => {
  const { genre } = req.query;

  if (!genre) {
    return res.status(400).json({ message: 'Genre query parameter is required' });
  }

  try {
    const books = await Book.find({ genre }).limit(12); // Optional limit
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books by genre', error: error.message });
  }
};

module.exports = { getRandomBooks, getAllGenres, getBooksByGenre };
