import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import BookList from '../components/BookList';
import GenreSelector from '../components/GenreSelector';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const CategoryPage = () => {
  const { user } = useAuth();
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [genreBooks, setGenreBooks] = useState([]);

  // Fetch genres and set default genre
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axiosInstance.get('/api/books/genres');
        setGenres(res.data);

        // ✅ Set default selected genre to the first one
        if (res.data.length > 0) {
          setSelectedGenre(res.data[0]);
        }
      } catch (error) {
        console.error('Failed to load genres:', error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch books when genre changes
  useEffect(() => {
    if (!selectedGenre) return;

    const fetchBooks = async () => {
      try {
        const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};

        const [randomRes, genreRes] = await Promise.all([
          axiosInstance.get(`/api/books/random?limit=6&genre=${selectedGenre}`, { headers }),
          axiosInstance.get(`/api/books/genre?genre=${selectedGenre}`, { headers }),
        ]);

        setFeaturedBooks(randomRes.data);
        setGenreBooks(genreRes.data);
      } catch (error) {
        console.error('Failed to load books:', error);
      }
    };

    fetchBooks();
  }, [selectedGenre, user]);

  const handleBorrow = async (bookId) => {
    try {
      await axiosInstance.post(
        `/api/loans/borrow/${bookId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert('Book borrowed successfully!');

      // Refresh both book lists
      const [updatedRandom, updatedGenre] = await Promise.all([
        axiosInstance.get(`/api/books/random?limit=6&genre=${selectedGenre}`),
        axiosInstance.get(`/api/books/genre?genre=${selectedGenre}`),
      ]);

      setFeaturedBooks(updatedRandom.data);
      setGenreBooks(updatedGenre.data);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to borrow book');
    }
  };

  return (
    <div className="category-page">
      <h1 className="category-heading">Browse by Category</h1>

      <GenreSelector
        genres={genres}
        selectedGenre={selectedGenre}
        onSelect={setSelectedGenre}
      />

      {selectedGenre && (
        <>
          <BookList
            title={`Featured in ${selectedGenre}`}
            books={featuredBooks}
            onBorrow={handleBorrow}
          />
          <BookList
            title={`All ${selectedGenre} Books`}
            books={genreBooks}
            onBorrow={handleBorrow}
          />
        </>
      )}
    </div>
  );
};

export default CategoryPage;
