import React, { useState } from 'react';
import '../App.css';

const GenreSelector = ({ genres, selectedGenre, onSelect }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleGenres = showAll ? genres : genres.slice(0, 5);

  return (
    <div>
      <div className="genre-button-group">
        {visibleGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelect(genre)}
            className={`genre-button ${genre === selectedGenre ? 'active' : ''}`}
          >
            {genre}
          </button>
        ))}
      </div>

      {genres.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="toggle-genres-button"
        >
          {showAll ? 'Show Less' : 'Show All'}
        </button>
      )}
    </div>
  );
};

export default GenreSelector;
