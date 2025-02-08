import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useWishlist from '../useWishList';
import useRemoveItemFromWishlist from '../useRemoveItemFromWishlist';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const WishListPage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const { data: wishlistItems, error, isLoading } = useWishlist();
  const { mutate: removeItem, isLoading: isRemoving } = useRemoveItemFromWishlist();


  const handleRemoveItem = (gameId) => {
    removeItem(gameId, {
      onSuccess: () => {
        toast.success('Item removed from wishlist!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
      onError: (error) => {
        toast.error(`Failed to remove item: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true ,
          draggable: true,
          progress: undefined,
        });
      },
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
      <div className="flex justify-center items-center min-h-screen bg-[#151515]">
        <div className="text-red-500 text-xl">
          Error loading wishlist: {error.message}
        </div>
      </div>
    );
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#151515] p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Your Wishlist</h1>
          <div className="text-white text-xl">
            Your wishlist is empty. Browse games to add some!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="  p-10 ">
      <div className="container  mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white gap-2 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={20}  />
          Back to game
        </button>
        
      </div>
      <div className="max-w-6xl mx-auto   ">
        <h1 className="text-3xl font-bold text-white mb-8">Your Wishlist</h1>
       
        <div className=" container m-auto flex flex-col py-8">
          <div className='grid container grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {wishlistItems.map((item) => (
            <div 
              key={item.gameId} 
              className="bg-[#2B2B2B] container flex flex-col relative  group cursor-pointer  transition-all duration-300 md:hover:scale-105 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative ">
                <img 
                  src={item.gameImage} 
                  alt={item.gameName} 
                  className="object-cover rounded-lg w-full h-64 transition-opacity duration-300 "
                  onError={(e) => {
                    e.target.src = '/placeholder-game.jpg'; // Add a placeholder image
                  }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-4 line-clamp-1">
                  {item.gameName}
                </h2>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">
                    Added {new Date(item.addedAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.gameId)}
                    disabled={isRemoving}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-200 disabled:opacity-50"
                  >
                    {isRemoving ? 'Removing...' : 'Remove'}
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default WishListPage;