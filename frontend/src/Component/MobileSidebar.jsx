
import React from "react";
import { X, Plus, Bell, Settings, MessageCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate(); // Initialize useNavigate
  
  
  const handleWishlistClick = () => {
    navigate("/wishlist"); // Navigate to the wishlist page
   
    onClose(); // Close the sidebar
  };

  return (
    <div
      className={`md:hidden flex md:w-3/4 z-10 inset-y-0 overflow-y-auto fixed box-border top-0 right-0 bg-white rounded-l-3xl mt-5 mb-10 transform ${
        isOpen ? "translate-y-0" : "-translate-y-full hidden"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4 flex grow flex-col">
        <div className="flex ">
          <div className="flex flex-col items-center mb-10 ">
            <nav className="dropdown-library flex flex-col space-y-6 p-4 ">
              <a className="font-bold text-3xl">My library</a>
              <a href="/" className="text-2xl">Overview</a>
              <a href="/" className="text-2xl">My Games</a>
              <a
                
                className="text-2xl"
                onClick={handleWishlistClick} // Use handleWishlistClick
              >
                Wishlist
              </a>
              <a href="/" className="text-2xl">Reviews</a>
              <a href="/" className="text-2xl">Collections</a>          
            </nav>
            <nav className="flex flex-col space-y-6">
              <a href="/" className="text-3xl font-bold">Home</a>
              <a href="/" className="text-3xl font-bold">Reviews</a>
            </nav>
          </div>

          <div className="text-gray-600 space-y-4 p-4 flex flex-col items-center">
            <button
              onClick={onClose}
              aria-label="Close Sidebar"
              className="flex items-center justify-center"
            >
              <X size={30} />
            </button>

            <a href="/" className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex justify-center items-center">
                <span className="text-2xl text-white z-2"> L</span>
              </div>
              <span className="text-gray-400">Profile</span>
            </a>
            <a href="/" className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black flex justify-center items-center">
                <Plus size={20} color="#fffafa" />
              </div>
              <span className="text-gray-400">Add</span>
            </a>
            <a href="/" className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black flex justify-center items-center">
                <Bell size={20} color="#fffafa" />
              </div>
              <span className="text-gray-400">Notifications</span>
            </a>
            <a href="/" className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black flex justify-center items-center">
                <Settings size={20} color="#fffafa" />
              </div>
              <span className="text-gray-400">Setting</span>
            </a>
            <a href="/" className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black flex justify-center items-center">
                <MessageCircle size={20} color="#fffafa" />
              </div>
              <span className="text-gray-400">Messages</span>
            </a>
            <a href="/" className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black flex justify-center items-center">
                <LogOut size={20} color="#fffafa" />
              </div>
              <span className="text-gray-400">Logout</span>
            </a>
          </div>
        </div>

        <div className="p-4">
          <nav className="flex justify-between">
            <a href="/" className="text-2xl font-bold block">Browse</a>
          </nav>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <a href="/" className="text-xl">Reviews</a>
            <a href="/" className="text-xl">Platform</a>
            <a href="/" className="text-xl">Genres</a>
            <a href="/" className="text-xl">Tags</a>
            <a href="/" className="text-xl">Publishers</a>
            <a href="/" className="text-xl">Collections</a>
            <a href="/" className="text-xl">Stores</a>
            <a href="/" className="text-xl">Creators</a>
            <a href="/" className="text-xl">Developers</a>
          </div>
          
          <div className="space-y-3 mt-4 mb-10">
            <nav className="flex flex-col space-y-3">
              <a href="/" className="text-3xl font-bold block">API</a>
              <a href="/" className="text-3xl font-bold block">Get an API key</a>
              <a href="/" className="text-3xl font-bold block">Sitemap</a>
            </nav>
          </div>   
        </div>
      </div>
    </div>
  );
}

export default Sidebar;