import React from "react";
import { useState } from "react";
import { Plus, Gift,Ellipsis, ChevronRight } from "lucide-react";
import ViewMore from "./ViewMore";
import SimilarGames from "./SimilarGames";
import { useNavigate } from "react-router-dom";
import { withAuth } from '../hoc/withAuth.jsx';
import useAddItemToWishlist from '../useAddItemToWishlist';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function GameCard({ game , onAuthRequired}) {
  const [viewMore, setViewMore] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showSimilar, setShowSimilar] = useState(false);

  const navigate = useNavigate();
  const { mutate: addItemToWishlist } = useAddItemToWishlist();
  const handleMouseLeave = () => {
    if (viewMore) {
      setViewMore(false);
    }
  };
  const handleAddItem = () => {

    onAuthRequired(() => {
      console.log('onAuthRequired function called');
      addItemToWishlist(game),{
        
      }
      toast.success('Item added to wishlist!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }); 
    
  };
  return (
    <div
      onMouseLeave={handleMouseLeave}
      className=" flex flex-col relative overflow-visible  group cursor-pointer  rounded-lg transition-all duration-300 md:hover:scale-105 "
    >
      <div className=" bg-[#2B2B2B]   rounded-b-lg  ">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#3D3D3D] animate-pulse rounded-lg" />
        )}

        <img
          src={game.background_image}
          alt={game.name}
          className={`object-cover rounded-lg w-full h-64 transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        <div className="m-4">
          <a
            onClick={() => navigate(`/game/${game.id}`)}
            className="text-white font-bold text-2xl line-clamp-1 "
          >
            {game.name} 🎯{" "}
          </a>
          <div className="flex gap-3 mt-2 mb-8">
            <button className="bg-[#4D4D4D] text-white flex rounded-sm gap-1 pr-2 pl-1">
              <Plus size={20} color="#fffafa" />
              <span>{game.added}</span>
            </button>
            <button  onClick={handleAddItem} className="bg-[#4D4D4D] text-white flex rounded-sm gap-1 pr-2 pl-1">
              <Gift color="#fafafa" />
            </button>
            
            <button className="bg-[#4D4D4D] text-white flex rounded-sm gap-1 pr-2 pl-1">
              <Ellipsis color="#ffffff" />
            </button>
          </div>

          <div></div>

          {/* Conditional Rendering for View More */}
          <div>
            {viewMore && (
              <ViewMore released={game.released} genres={game.genres} />
            )}
          </div>

          <div>
            <ul className="flex mt-2 justify-center">
              <li>
                <button
                  onClick={() => setViewMore(!viewMore)}
                  className="text-white text-sm underline"
                >
                  {viewMore ? "View Less" : "View More"}
                </button>
              </li>
            </ul>
          </div>

          {viewMore && (
            <div
              onClick={() =>
                navigate(`/game/${game.id}/similar`, {
                  state: { gameName: game.name },
                })
              }
              className=" bg-[#4D4D4D] p-2 rounded-lg mt-2 flex justify-between"
            >
              <button className="text-white text-sm hover:text-yellow-400">
                Show More like this
              </button>
              <ChevronRight color="#aaa7a7" />
            </div>
          )}
        </div>
      </div>
      {showSimilar && (
        <SimilarGames gameId={game.id} onClose={() => setShowSimilar(false)} />
      )}
    </div>
  );
}

export default withAuth(GameCard);
