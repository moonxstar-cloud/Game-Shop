

import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slice/authSlice';

function Header({ onMenuClick ,setSearchQuery}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className='flex justify-between items-center p-4 ' >
      <div className="flex items-center">
        <h1 className="text-white font-bold text-xl m-5 cursor-pointer" onClick={() => navigate('/')}>
          RAWG
        </h1>
      </div>

      <div className='md:flex-1 mx-4 relative'>
        <Search color="#bebebe" className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600' size={24}/>
        <input 
          type="search"  
          placeholder='Search' 
          className='pl-12 py-2 w-4/5 rounded-full bg-[#2B2B2B] text-white outline-none' 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='flex gap-3 items-center'>
        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <div 
              className='w-8 h-8 bg-purple-600 rounded-full flex justify-center items-center cursor-pointer'
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className='text-white'>{user?.name?.[0].toUpperCase()}</span>
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#2B2B2B] ring-1 ring-black ring-opacity-5 z-20">
                <div className="py-1" role="menu">
                  <div className="px-4 py-2 text-sm text-gray-300">
                    {user?.email}
                  </div>
                  <div onClick={() => navigate('/wishlist')} className="px-4 py-2 text-sm text-white hover:bg-purple-600 cursor-pointer">
                    My Wishlist
                  </div>
                  <div
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-white hover:bg-purple-600 cursor-pointer flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign out
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            className="text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        )}
        
        <button className='text-white md:hidden relative z-50' onClick={onMenuClick}>
          <Menu size={24} />
        </button>
      </div>
    </header>

  );
}

export default Header;