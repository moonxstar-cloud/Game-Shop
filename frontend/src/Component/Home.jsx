import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import GameCard from "./GameCard";
import Pagination from "./Pagination";
import DesktopSidebar from "./DesktopSidebar";
import Header from "./Header";
function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const fetchGames = async () => {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=c542e67aec3a4340908f9de9e86038af&page=${currentPage}&page_size=${pageSize}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["games", currentPage],
    queryFn: fetchGames,
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">Error: {error.message}</div>
    );
  }

  const totalPages = Math.ceil(data?.count / pageSize);
  return (
    <div className="flex-1 p-4">

       
      <div className="block  ">
       
        <div className="flex justify-center gap-3 flex-col items-center">
          <h1 className="text-white text-4xl font-bold">Top Picks</h1>
          <p className="text-center text-white">Based on your ratings</p>
        </div>
        <main>
        
          <div className="container m-auto flex flex-col py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
              {data?.results.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
