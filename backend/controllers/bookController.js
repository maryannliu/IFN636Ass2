const { Book } = require('../models/Books');

// @desc    Get random books
// @route   GET /api/books/random
// @access  Public
const getRandomBooks = async (req, res) => {
  const { limit = 6, type } = req.query;

  try {
    const matchStage = type ? { $match: { __t: type } } : { $match: {} };

    const books = await Book.aggregate([
      matchStage,
      { $sample: { size: parseInt(limit) } }
    ]);

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch random books', error: error.message });
  }
};

module.exports = { getRandomBooks };
