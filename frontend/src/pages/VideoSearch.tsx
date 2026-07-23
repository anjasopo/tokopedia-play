import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, ArrowLeft, Tv } from 'lucide-react';
import { getVideos } from '../api/video.api';
import { VideoCard } from '../components/video/VideoCard';
import { LoadingSpinner, ErrorMessage } from '../components/common/ErrorBoundary';
import { ROUTES } from '../utils/constants';

export const VideoSearch: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const {
    data: videos = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['videos-search', query],
    queryFn: () => getVideos(query),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to={ROUTES.HOME}
          className="p-2 rounded-full bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-tokopedia-500" />
            Hasil Pencarian: <span className="text-emerald-400">"{query || 'Semua Live'}"</span>
          </h1>
          <p className="text-xs text-gray-400">Menampilkan tayangan live streaming Tokopedia Play</p>
        </div>
      </div>

      {isLoading && <LoadingSpinner label="Mencari tayangan live..." className="py-12" />}

      {isError && <ErrorMessage message={(error as Error)?.message} onRetry={() => refetch()} />}

      {!isLoading && !isError && videos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}

      {!isLoading && !isError && videos.length === 0 && (
        <div className="py-20 text-center space-y-3 bg-gray-900/50 rounded-2xl border border-gray-800">
          <Tv className="w-12 h-12 text-gray-600 mx-auto" />
          <h3 className="text-base font-bold text-gray-300">Tidak ada hasil ditemukan</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Coba kata kunci pencarian yang lain seperti "Promo", "Diskon", atau "HP".
          </p>
        </div>
      )}
    </div>
  );
};
