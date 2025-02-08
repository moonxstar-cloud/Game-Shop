import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import GameCard from "./GameCard";
import Pagination from "./Pagination";
import { ChevronUp ,ChevronDown} from "lucide-react";
function GenreGamesScreen() {
  const { genreId } = useParams(); // Extract genreId from the URL
  const location = useLocation();
  const genreName = location.state?.genreName || "Unknown Genre";
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 40;

  const fetchGenreDetails = async () => {
    const response = await fetch(
      `https://api.rawg.io/api/genres/${genreId}?key=c542e67aec3a4340908f9de9e86038af`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };
  

  const fetchGamesByGenre = async ({ queryKey }) => {
    const [, { genreId, page }] = queryKey;

    const response = await fetch(
      `https://rawg.io/api/games?genres=${genreId}&page=${page}&page_size=${pageSize}&filter=true&comments=true&key=c542e67aec3a4340908f9de9e86038af`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
    
  };
  const { data: genreData } = useQuery({
    queryKey: ["genreDetails", genreId],
    queryFn: fetchGenreDetails
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["gamesByGenre", { genreId, page: currentPage }],
    queryFn: fetchGamesByGenre,
    keepPreviousData: true,
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  const totalPages = Math.ceil(data?.count / pageSize);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-white text-4xl font-bold text-center mb-10">
         {genreName} Games
      </h1>

       {genreData.description && (
        <div className="text-white  max-w-3xl mx-auto mb-10 ">
          <div 
            className={`relative ${!isExpanded ? 'max-h-24 overflow-hidden' : ''}`}
          >
            <div
              dangerouslySetInnerHTML={{ __html: genreData.description }}
              className="text-start"
            />
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#121212] to-transparent" />
            )}
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 mx-auto mt-2 text-gray-400 hover:text-white"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp size={20} /></>
            ) : (
              <>Read More <ChevronDown size={20} /></>
            )}
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {data.results.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
     
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default GenreGamesScreen;

