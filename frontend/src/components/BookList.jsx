import { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const BookList = ({ title, query = '', endpoint = '/api/books/random', limit = 6 }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fullUrl = query ? `${endpoint}${query}` : `${endpoint}?limit=${limit}`;
        const res = await axios.get(fullUrl);
        setBooks(res.data);
      } catch (err) {
        console.error(`Failed to fetch books for ${title}`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [endpoint, query, title, limit]);

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {books.map((book, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-blue-700">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-xs text-gray-400 italic">{book.__t}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BookList;
