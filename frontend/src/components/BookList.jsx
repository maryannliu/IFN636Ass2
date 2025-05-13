import { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const BookList = ({ title, query = '' }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`/api/books/random${query}`);
        setBooks(res.data);
      } catch (err) {
        console.error('Failed to fetch books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : books.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {books.map((book, index) => (
            <div key={index} className="bg-white p-4 shadow rounded">
              <h3 className="text-md font-semibold text-blue-700">{book.title}</h3>
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
