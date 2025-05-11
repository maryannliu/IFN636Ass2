import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const Explore = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // We'll implement this backend later
    const fetchBooks = async () => {
      try {
        const { data } = await axiosInstance.get('/books/explore');
        setBooks(data);
      } catch (error) {
        console.error('Failed to load books', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Books</h1>
      {books.length === 0 ? (
        <p>No books available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <div
              key={book._id}
              className="border rounded-xl shadow p-4 hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
              <p className="text-sm mt-1 italic text-gray-500">{book.genre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
