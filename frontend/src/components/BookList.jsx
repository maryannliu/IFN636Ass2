import React from 'react';
import BookCard from './BookCard';

const BookList = ({ title, books = [], onBorrow, onReturn }) => {
  return (
    <div className="book-list-section">
      {title && <h2 className="book-list-title">{title}</h2>}

      <div className="book-list-container">
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onBorrow={onBorrow}
              onReturn={onReturn}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BookList;
