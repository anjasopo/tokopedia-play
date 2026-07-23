import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Play, ShoppingBag, Bell } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

export const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.VIDEO_SEARCH}?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-tokopedia-500 flex items-center justify-center text-white shadow-lg shadow-tokopedia-500/30 group-hover:scale-105 transition-transform">
            <Play className="w-5 h-5 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
              tokopedia <span className="px-1.5 py-0.5 text-xs font-bold bg-tokopedia-500 text-white rounded-md">PLAY</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-medium tracking-wider uppercase">Live Shopping</span>
          </div>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-lg hidden sm:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari live streaming, produk, atau toko..."
              className="w-full bg-gray-900/90 text-sm text-gray-100 placeholder-gray-400 pl-10 pr-4 py-2 rounded-full border border-gray-800 focus:border-tokopedia-500 focus:outline-none focus:ring-2 focus:ring-tokopedia-500/20 transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to={ROUTES.VIDEO_SEARCH}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/60 sm:hidden"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </Link>

          <button className="relative p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/60 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tokopedia-500 rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tokopedia-500 rounded-full" />
          </button>

          <button className="relative p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/60 transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </button>

          <div className="h-6 w-px bg-gray-800 hidden sm:block" />

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 pl-2">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
              alt="Profile"
              className="w-8 h-8 rounded-full border border-emerald-500/40 object-cover"
            />
            <span className="text-xs font-semibold text-gray-200 hidden md:inline">User Tokopedia</span>
          </div>
        </div>
      </div>
    </header>
  );
};
