import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameScreenshots = ({ screenshots, gameId }) => {
    
    const navigate = useNavigate();
  
    if (!Array.isArray(screenshots) || screenshots.length === 0) {
      return <div className="text-gray-400">No screenshots available</div>;
    }
  
    const handleViewAll = () => {
      navigate(`/game/${gameId}/screenshots`, { state: { screenshots } });
    };
  return (
    <div className="mt-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-white text-2xl font-bold">Screenshots</h2>
      <button
        onClick={handleViewAll}
        className="text-gray-400 hover:text-white transition-colors"
      >
        View all
      </button>
    </div>

    {/* Desktop Preview - Shows 4 screenshots in a grid */}
    <div className="hidden md:grid grid-cols-4 gap-4">
      {screenshots.slice(0, 4).map((screenshot) => (
        <div
          key={screenshot.id}
          className="relative group cursor-pointer"
        >
          <img
            src={screenshot.image}
            alt={`Screenshot ${screenshot.id}`}
            className="w-full h-32 object-cover rounded-lg"
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg" />
        </div>
      ))}
    </div>

    {/* Mobile Preview - Shows 3 screenshots in a grid */}
    <div className="grid md:hidden grid-cols-2 gap-2">
      <div className="col-span-2">
        <img
          src={screenshots[0]?.image}
          alt="Main screenshot"
          className="w-full h-48 object-cover rounded-lg mb-2"
          loading="lazy"
        />
      </div>
      <div>
        <img
          src={screenshots[1]?.image}
          alt="Screenshot 2"
          className="w-full h-24 object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      <div className="relative">
        <img
          src={screenshots[2]?.image}
          alt="Screenshot 3"
          className="w-full h-24 object-cover rounded-lg"
          loading="lazy"
        />
        {screenshots.length > 3 && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg cursor-pointer"
            onClick={handleViewAll}
          >
            <span className="text-white font-medium">
              +{screenshots.length - 3} more
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default GameScreenshots;