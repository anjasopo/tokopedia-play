import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sparkles, Flame, Play, Radio, RefreshCw } from 'lucide-react';
import { getVideos } from '../api/video.api';
import { VideoCard } from '../components/video/VideoCard';
import { ErrorMessage } from '../components/common/ErrorBoundary';
import { CATEGORIES } from '../utils/constants';

export const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery] = useState('');

  const {
    data: videos = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['videos', searchQuery],
    queryFn: () => getVideos(searchQuery),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Hero Banner Banner Tokopedia Play */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-gray-900 to-emerald-900 border border-emerald-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-tokopedia-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tokopedia-500/20 border border-tokopedia-500/40 text-emerald-400 text-xs font-extrabold tracking-wide uppercase">
            <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
            Tokopedia Live Shopping 24/7
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Nonton Live Stream & Belanja Produk <span className="text-tokopedia-500 underline decoration-tokopedia-500/40">Diskon Spesial!</span>
          </h1>

          <p className="text-sm text-gray-300 leading-relaxed">
            Dapatkan flash sale eksklusif, voucher cashback, dan obrolan langsung bersama penjual favorit di Tokopedia Play.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>120+ Streamer Aktif</span>
            </div>
            <div className="h-4 w-px bg-gray-700" />
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Diskon s/d 70%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-tokopedia-500 text-white shadow-lg shadow-tokopedia-500/30 scale-105'
                : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Live Stream Section Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              Sedang Live Sekarang
            </h2>
          </div>
          <button
            onClick={() => refetch()}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[9/16] bg-gray-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <ErrorMessage
            message={(error as Error)?.message || 'Gagal memuat video live'}
            onRetry={() => refetch()}
          />
        )}

        {/* Video Cards Grid */}
        {!isLoading && !isError && videos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && videos.length === 0 && (
          <div className="text-center py-16 space-y-3 bg-gray-900/50 rounded-2xl border border-gray-800">
            <Play className="w-12 h-12 text-gray-600 mx-auto" />
            <h3 className="text-base font-bold text-gray-300">Belum Ada Live Stream</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Tidak ada tayangan live stream yang cocok saat ini. Coba muat ulang atau pilih kategori lain.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
