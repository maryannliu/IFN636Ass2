const Book = require('../models/Book');

class BookController {
  
  static async getRandomBooks(req, res) {
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
      res.status(500).json({ error: 'Failed to fetch random books' });
    }
  }

  
  static async getAllGenres(req, res) {
    try {
      const genres = await Book.distinct('genre');
      res.status(200).json(genres);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch genres' });
    }
  }

  
  static async getBooksByGenre(req, res) {
    const { genre } = req.query;

    if (!genre) {
      return res.status(400).json({ error: 'Genre query parameter is required' });
    }

    try {
      const books = await Book.find({ genre }).limit(12);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch books by genre' });
    }
  }
}

module.exports = BookController;
