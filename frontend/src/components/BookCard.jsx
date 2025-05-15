import React from 'react';
import '../App.css';

const BookCard = ({ book, onBorrow, onReturn }) => {
  const { _id, title, author, genre, __t: type, availability } = book;

  const handleBorrowClick = () => {
    if (availability && onBorrow) {
      onBorrow(_id);
    }
  };

  return (
    <div className="book-card-container">
      <div className="book-card-info">
        <h3 className="book-card-title">{title}</h3>
        <p className="book-card-detail"><strong>Author:</strong> {author || 'Unknown'}</p>
        <p className="book-card-detail"><strong>Genre:</strong> {genre}</p>
        <p className="book-card-detail"><strong>Type:</strong> {type || 'N/A'}</p>
      </div>

      {/* Borrow Button */}
      {onBorrow && (
        <button
          className={`book-card-borrow-button ${availability ? 'available' : 'unavailable'}`}
          onClick={handleBorrowClick}
          disabled={!availability}
        >
          {availability ? 'Borrow' : 'Unavailable'}
        </button>
      )}

      {/* Return Button */}
      {onReturn && (
        <button
          className="book-card-return-button book-card-borrow-button available"
          onClick={() => onReturn(_id)}
        >
          Return
        </button>
      )}
    </div>
  );
};

export default BookCard;
