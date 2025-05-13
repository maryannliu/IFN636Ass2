import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import BookList from '../components/BookList';

const Categories = () => {
  const { user } = useAuth();
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axiosInstance.get('/api/books/genres');
        setGenres(res.data);
        setSelectedGenre(res.data[0]); 
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to load genres';
        alert(message);
      }
    };

    fetchGenres();
  }, []);


  if (!user) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        You must be logged in to view this page.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      

      <div className="flex flex-wrap gap-2 mb-10">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded ${
              selectedGenre === genre ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {selectedGenre && (
        <>
          <BookList
            title={`Featured ${selectedGenre} Books`}
            query={`?genre=${encodeURIComponent(selectedGenre)}&limit=4`}
          />
          <BookList
            title={`All ${selectedGenre} Books`}
            endpoint="/api/books/by-genre"
            query={`?genre=${encodeURIComponent(selectedGenre)}`}
          />
        </>
      )}
    </div>
  );
};

export default Categories;
