// import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Gift, Plus } from "lucide-react";
import Header from "./Header";
import { useState } from "react";
import GameScreenshots from "./GameScreenshots";
import { withAuth } from '../hoc/withAuth';
import useAddItemToWishlist from "../useAddItemToWishlist";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
const GameDescription = ({ onAuthRequired  }  ) => {
  const { mutate: addItemToWishlist } = useAddItemToWishlist();
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [page, setPage] = useState(1); // If it's a state variable
  const pageSize = 12;
  const [itemAdded, setItemAdded] = useState(false);
  const userId = useSelector((state) => state.auth.user?.id); // Get userId from Redux
 

  const fetchGameDetails = async () => {
    try {
      const [gameResponse, seriesResponse, dlcResponse, screenshotsResponse] =
        await Promise.all([
          fetch(
            `https://api.rawg.io/api/games/${gameId}?key=c542e67aec3a4340908f9de9e86038af`
          ),
          fetch(
            `https://api.rawg.io/api/games/${gameId}/game-series?key=c542e67aec3a4340908f9de9e86038af`
          ),
          fetch(
            `https://api.rawg.io/api/games/${gameId}/additions?key=c542e67aec3a4340908f9de9e86038af`
          ),
          fetch(
            `https://api.rawg.io/api/games/${gameId}/screenshots?page=${page}&page_size=${pageSize}&key=c542e67aec3a4340908f9de9e86038af`
          ),
        ]);

      const [gameData, seriesData, dlcData, screenshotsData] =
        await Promise.all([
          gameResponse.json(),
          seriesResponse.json(),
          dlcResponse.json(),
          screenshotsResponse.json(),
        ]);
      console.log(screenshotsData);
      return {
        ...gameData,
        series: seriesData.results || [],
        dlc: dlcData.results || [],
        screenshots: screenshotsData.results || [],
      };
    } catch (error) {
      console.error("Error fetching game details:", error);
      throw error;
    }
  };
  
  const {
    data: game,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gameDetails", gameId],
    queryFn: fetchGameDetails,
    // Add these options to handle undefined data better
    retry: 2,
    refetchOnWindowFocus: false,
    // Ensure we have a default value if the data is undefined
    select: (data) => ({
      ...data,
      screenshots: data?.screenshots || [],
      count: data?.count,
    }),
  });
  const handleAddItem = () => {
    onAuthRequired(() => {
      if (!itemAdded) {
        addItemToWishlist(game, {
          onSuccess: () => {
            toast.success('Item added to wishlist!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setItemAdded(true);
          },
        });
      } else {
        toast.info('Item already added to wishlist!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
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
      <div>
        <Header />
        <div className="container mx-auto p-4">
          <p className="text-red-500">Error loading game details</p>
        </div>
      </div>
    );
  }

  const colorMap = {
    exceptional: "bg-green-400",
    recommended: "bg-blue-400",
    meh: "bg-yellow-400",
    skip: "bg-red-400",
  };

  console.log(game);
  return (
    <div className="min-h-screen ">
      <div
        className="min-h-[500px] relative pb-16 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),url(${game.background_image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/80 to-transparent">
          <div className="container mx-auto px-4 pt-16">
            <div className="text-white text-center font-bold text-4xl mb-8">
              <h1 className="text-">{game.name} Ratings</h1>
            </div>

            <div className=" flex md:flex-row sm:flex-col gap-4 mt-4">
              <button className=" bg-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                <Plus size={20} />
                Add to My Games
              </button>

              <button onClick={handleAddItem}
                className="bg-gray-800 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              > 
                <Gift size={20} />
                Add to My WishList
              </button>
            </div>
            <div className=" m-2 p-2">
              <GameScreenshots
                screenshots={game.screenshots || []}
                gameId={gameId}
                count={game.count}
              />
            </div>
            <div className="container mx-auto p-4 ">
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-white text-xl font-bold">Exception 🎯</h2>
                <p className="text-gray-400 underline">
                  {game.reviews_count || "N/A"} Ratings
                </p>
              </div>

              <div className="text-gray-400  flex mb-2 flex-wrap gap-4 mt-3 ">
                {game.ratings?.map((rating) => (
                  <div
                    key={rating.id}
                    className={`flex flex-start border-2 border-transparent hover:border-2 m-3 hover:border-gray-400 gap-3 rounded-3xl mb-2 p-2`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-lg ${
                          colorMap[rating.title] || "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <div className="text-white font-bold capitalize">
                      {rating.title}
                    </div>
                    <div className="font-bold text-gray-400">
                      {rating.count}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-white text-2xl font-bold mb-4">About</h2>
                  <div className="relative">
                    <div
                      className={`text-white leading-relaxed mb-8 relative ${
                        !isExpanded ? "max-h-48 overflow-hidden" : ""
                      }`}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: game.description }}
                      />
                      {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#121212] to-transparent" />
                      )}
                    </div>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="flex items-center justify-between gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          Show Less <ChevronUp size={20} />
                        </>
                      ) : (
                        <>
                          Read More <ChevronDown size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border-2 h-fit p-2">
                  <div className="space-y-4  text-start ">
                    <div className="grid grid-cols-2">
                      <div>
                        <h3 className="text-gray-400 text-sm mb-1">
                          Release Date
                        </h3>
                        <p className="text-white">{game.released || "TBA"}</p>
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm ">Metacritic</h3>
                        <div
                          className={`text-xl font-bold border-2 w-fit bg-[#4D4D4D] rounded-lg p-1 border-[#6dc849] ${
                            game.metacritic >= 75
                              ? "text-green-500 "
                              : game.metacritic >= 50
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          <span className="text-center">{game.metacritic}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm mb-1">Rating</h3>
                        <p className="text-white">{game.rating || "N/A"}/5</p>
                      </div>

                      <div>
                        <h3 className="text-gray-400 text-sm mb-1">
                          Platforms
                        </h3>
                        <p className="text-white underline">
                          {" "}
                          {game.platforms
                            ?.map((p) => p.platform.name)
                            .join(",")}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-gray-400 text-sm mb-1">Genres</h3>
                        <p className="text-white underline">
                          {" "}
                          {game.genres?.map((genre) => genre.name).join(",")}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-gray-400 text-sm m-1">Developer</h3>
                        <p className="text-white">
                          {game.developers?.map((d) => d.name).join(", ") ||
                            "N/A"}
                        </p>
                      </div>
                      {game.esrb_rating && (
                        <div>
                          <h3 className="text-gray-400 text-sm mb-1">
                            Age Rating
                          </h3>
                          <p className="text-white">{game.esrb_rating.name}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-gray-400 text-sm mb-1">
                        Other Games in the Series
                      </h3>
                      <p
                        onClick={() => navigate(`/game/${seriesGame.id}`)}
                        className="text-white underline"
                      >
                        {" "}
                        {game.series
                          ?.map((seriesGame) => seriesGame.name)
                          .join(",")}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-gray-400 text-sm mb-1">
                        DLCs and Editions
                      </h3>
                      <p
                        onClick={() => navigate(`/game/${seriesGame.id}`)}
                        className="text-white underline "
                      >
                        {" "}
                        {game.dlc?.map((dlc) => dlc.name).join(",")}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-gray-400 text-sm mb-1">Tags</h3>
                      <p
                        onClick={() => navigate(`/game/${seriesGame.id}`)}
                        className="text-white underline "
                      >
                        {" "}
                        {game.tags
                          ?.slice(0, 8)
                          .map((tag) => tag.name)
                          .join(",")}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-gray-400 text-sm mb-1">Website</h3>
                      <p href={game.website} className="text-white underline ">
                        http://www.rockstargames.com/V/
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(GameDescription);