import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import Pagination from './Pagination';

const GameScreenshotsPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  const navigate = useNavigate();
  const { gameId } = useParams();
  const pageSize = 12;

  useEffect(() => {
    const fetchScreenshots = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${gameId}/screenshots?page=${currentPage}&page_size=${pageSize}&key=c542e67aec3a4340908f9de9e86038af`
        );
        const data = await response.json();
        setScreenshots(data.results);
        setTotalCount(data.count);
      } catch (err) {
        setError('Failed to load screenshots');
        console.error('Error fetching screenshots:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScreenshots();
  }, [gameId, currentPage]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#151515] p-4 text-white">
        <div className="container mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white gap-2 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to game
          </button>
          <div className="text-center mt-8">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#151515] p-4">
      {/* Header */}
      <div className="container mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white gap-2 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to game
        </button>
        <h1 className="text-white text-3xl font-bold mt-4">All Screenshots</h1>
      </div>

      {/* Grid of screenshots */}
      <div className="container mx-auto">
        {isLoading ? (
          <>
          <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
          
          </>
          
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {screenshots.map((screenshot) => (
                <div
                  key={screenshot.id}
                  onClick={() => setSelectedImage(screenshot.image)}
                  className="cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src={screenshot.image}
                    alt={`Screenshot ${screenshot.id}`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
          <div 
            className="max-w-7xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full size screenshot"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreenshotsPage;