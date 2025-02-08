import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function DesktopSidebar() {
  const navigate = useNavigate();
  return (
    <div className="hidden pl-3 pt-12 md:flex flex-col w-60 h-[calc(100vh-64px)] bg-[#151515] border-r border-gray-700">
      <div className="flex flex-col p-4 space-y-4">
        <Link to="/" className="flex items-center space-x-2 text-white hover:text-[#666565]">
        
          <span className="font-bold text-2xl">Home</span>
        </Link>
        <Link to="" className="flex items-center space-x-2 text-white hover:text-[#666565]">
         
          <span className="font-bold text-2xl">Reviews</span>
        </Link>
        <Link to="" className="flex items-center space-x-2 text-white hover:text-[#666565]">
          
          <span className="font-bold text-2xl">New Releases</span>
        </Link>
        <Link to="" className="flex items-center space-x-2 text-white hover:text-[#666565]">
        
          <span className="font-bold text-2xl"> All Games</span>
        </Link>
        <Link  to="/wishlist" className="flex items-center space-x-2 text-white hover:text-[#666565]">
        
          <span className="font-bold text-2xl">WishList</span>
        </Link>
      </div>

      
    </div>
  );
}

export default DesktopSidebar;