import React from 'react';

export default function AdminNavbar() {
  return (
    <nav className="h-24 bg-white shadow-lg  border-white-200 px-6 lg:px-12 flex items-center justify-between rounded-2xl">
      {/* Logo / Brand */}
      <div className="flex-shrink-0">
        <h1 className="text-4xl md:text-5xl font-bold font-serif italic text-white-900 tracking-wide text-shadow-lg/20 cursor-pointer">
          Zero Store
          <span className="block h-1 w-24 bg-white-600 mt-1 rounded-full mx-auto"></span>
        </h1>
      </div>

      {/* Right Section: Search + Profile + Logout */}
      <div className="flex items-center gap-12 w-full max-w-4xl">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="search"
              placeholder="Search products, orders..."
              className="w-full px-6 py-4 pr-12 text-lg font-medium italic placeholder-white-600/70
                       bg-white/90 border border-white-300 rounded-xl shadow-inner
                       focus:outline-none focus:ring-4 focus:ring-white-300 focus:border-white-500
                       transition-all duration-300 shadow-md hover:shadow-lg"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Profile & Logout */}
        <div className="flex items-center gap-12">
          {/* Profile Avatar */}
          <button className="relative group">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-white-300 ring-offset-2 transition-all group-hover:ring-white-500">
              <img
                src="https://i.pinimg.com/1200x/35/61/4b/35614bc96ddec9afe6ac21e656b8c2a0.jpg"
                alt="Admin Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
          </button>

          {/* Logout Button */}
          <button className="px-6 py-3  font-semibold rounded-xl shadow-md hover:shadow-xl 
                           transform hover:scale-105 transition-all duration-200 bg-black text-white cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}