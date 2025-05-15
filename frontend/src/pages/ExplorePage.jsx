import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import BookList from '../components/BookList';

const ExplorePage = () => {
  const { user } = useAuth(); // Get user with token
  const [staffPicks, setStaffPicks] = useState([]);
  const [exploreBooks, setExploreBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const headers = user?.token ? {
          Authorization: `Bearer ${user.token}`
        } : {};

        const [staffRes, exploreRes] = await Promise.all([
          axiosInstance.get('/api/books/random?limit=6', { headers }),
          axiosInstance.get('/api/books/random?limit=6', { headers }),
        ]);

        setStaffPicks(staffRes.data);
        setExploreBooks(exploreRes.data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    if (user) {
      fetchBooks();
    }
  }, [user]);

  const handleBorrow = async (bookId) => {
    try {
      const res = await axiosInstance.post(
        `/api/loans/borrow/${bookId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert(res.data.message);

      // Update staff picks
      setStaffPicks((prev) =>
        prev.map((book) =>
          book._id === bookId ? { ...book, availability: false } : book
        )
      );

      // Update explore books
      setExploreBooks((prev) =>
        prev.map((book) =>
          book._id === bookId ? { ...book, availability: false } : book
        )
      );
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to borrow book');
    }
  };

  return (
    <div className="explore-page">
      <BookList title="Staff Picks" books={staffPicks} onBorrow={handleBorrow} />
      <BookList title="Explore Books" books={exploreBooks} onBorrow={handleBorrow} />
    </div>
  );
};

export default ExplorePage;
