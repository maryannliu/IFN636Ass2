import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import BookList from '../components/BookList';

const Explore = () => {
  const { user } = useAuth();

  // Redirect if not logged in
  /*if (!user) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        You must be logged in to view this page.
      </div>
    );
  }*/

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      {/* Rotating Banner Placeholder */}
      <div className="w-full h-60 bg-blue-100 rounded-xl flex items-center justify-center shadow mb-10">
        <p className="text-lg text-blue-700 font-semibold">[ Rotating Banner Placeholder ]</p>
      </div>

      {/* Book Lists */}
      <BookList title="Staff Picks" />
      <BookList title="Top Audiobooks" query="?type=AudioBook" endpoint="/api/books/random" limit={6} />
    </div>
  );
};

export default Explore;

