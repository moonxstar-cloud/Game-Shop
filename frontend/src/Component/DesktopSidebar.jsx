import React from "react";
import { useNavigate } from "react-router-dom";

function DesktopSidebar({ clearSearchQuery }) {
  const navigate = useNavigate();

  // Function to handle navigation and clear search query
  const handleNavigation = (path) => {
    clearSearchQuery(); // Clear the search query
    navigate(path); // Navigate to the desired page
  };

  return (
    <div className="hidden pl-3 pt-12 md:flex flex-col w-60 h-[calc(100vh-64px)] bg-[#151515] border-r border-gray-700">
      <div className="flex flex-col p-4 space-y-4">
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center space-x-2 text-white hover:text-[#666565]"
        >
          <span className="font-bold text-2xl">Home</span>
        </button>
        <button
          onClick={() => handleNavigation("/reviews")}
          className="flex items-center space-x-2 text-white hover:text-[#666565]"
        >
          <span className="font-bold text-2xl">Reviews</span>
        </button>
        <button
          onClick={() => handleNavigation("/new-releases")}
          className="flex items-center space-x-2 text-white hover:text-[#666565]"
        >
          <span className="font-bold text-2xl">New Releases</span>
        </button>
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center space-x-2 text-white hover:text-[#666565]"
        >
          <span className="font-bold text-2xl">All Games</span>
        </button>
        <button
          onClick={() => handleNavigation("/wishlist")}
          className="flex items-center space-x-2 text-white hover:text-[#666565]"
        >
          <span className="font-bold text-2xl">WishList</span>
        </button>
      </div>
    </div>
  );
}

export default DesktopSidebar;