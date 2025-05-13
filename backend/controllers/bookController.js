const { Book } = require('../models/Books');

// Get random books
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
    res.status(500);
    throw new Error('Failed to fetch random books');
  }
};


// Get all distinct genres
const getAllGenres = async (req, res) => {
  try {
    const genres = await Book.distinct('genre');
    res.status(200).json(genres);
  } catch (error) {
    res.status(500);
    throw new Error('Failed to fetch genres');
  }
};

const getBooksByGenre = async (req, res) => {
  const { genre } = req.query;

  if (!genre) {
    return res.status(400);
    throw new Error('Genre query parameter is required');
  }

  try {
    const books = await Book.find({ genre }).limit(12); // Optional limit
    res.status(200).json(books);
  } catch (error) {
    res.status(500);
    throw new Error('Failed to fetch books by genre');
  }
};

module.exports = { getRandomBooks, getAllGenres, getBooksByGenre };
