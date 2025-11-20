import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Website Name */}
          <h1 className="text-2xl font-serif text-shadow-lg/20 italic text-black tracking-tight cursor-pointer">
            Zero Store
          </h1>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-8">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-black text-white shadow-md'
                    : 'text-gray-700 hover:bg-black hover:text-white hover:duration-500 '
                }`
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-200 border  hover:duration-500 ${
                  isActive
                    ? 'bg-black text-white border-black shadow-md'
                    : 'border-gray-300 text-gray-700 hover:bg-black hover:text-white hover:border-black'
                }`
              }
            >
              Register
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;