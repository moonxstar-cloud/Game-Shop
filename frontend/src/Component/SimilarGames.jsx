import React from "react";
import { useParams, useLocation ,useNavigate  } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import GameCard from "./GameCard";
import Pagination from "./Pagination";
import { useState } from "react";
import {X } from "lucide-react";


function SimilarGamesScreen() {

  const { gameId } = useParams(); // Get gameId from URL
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const pageSize = 20;
  const location = useLocation();
  const gameName = location.state?.gameName || "Unknown Game";
  const navigate = useNavigate();
  const fetchSimilarGames = async ({ queryKey } ) => {
    const [, { gameId, page ,pageSize}] = queryKey;
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameId}/suggested?discover=true&ordering=-added&page_size=${pageSize}&page=${page}&key=c542e67aec3a4340908f9de9e86038af`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["similarGames", { gameId, page: currentPage }],
    queryFn: fetchSimilarGames,
    keepPreviousData: true,
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Scroll to the top when the page changes
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
      <div className="flex flex-col justify-between items-center mb-10">
        <span className="text-white text-4xl font-bold mb-4">Games Like </span>

        <div className=" flex  gap-10 justify-between items-center mx-auto  p-5 rounded-lg bg-[#3D3D3D]"> 
        <span className="text-lg text-white font-bold ">{gameName}</span>
        <button  onClick={() => navigate(-1)} ><X color="#ffffff" size={20} /></button>
        </div>
      </div>

        
        

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {data.results.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <Pagination currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}/>
    </div>
  );
}

export default SimilarGamesScreen;
