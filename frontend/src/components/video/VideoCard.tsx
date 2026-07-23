import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Play, Eye, Flame } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
import { Video } from '../../types';

interface VideoCardProps {
  video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = memo(({ video }) => {
  const { videoID, urlImageThumbnail, titleImageThumbnail, channelName, viewsCount, isLive = true } = video;

  return (
    <Link
      to={`/${videoID}`}
      className="group relative flex flex-col bg-gray-900/80 rounded-2xl overflow-hidden border border-gray-800/80 hover:border-tokopedia-500/50 shadow-lg hover:shadow-tokopedia-500/10 transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-gray-950">
        <img
          src={urlImageThumbnail}
          alt={titleImageThumbnail}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:from-black/95 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {isLive ? (
            <span className="px-2 py-0.5 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-extrabold rounded-md flex items-center gap-1 tracking-wider uppercase shadow-md animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              LIVE
            </span>
          ) : (
            <span className="px-2 py-0.5 bg-gray-800/80 backdrop-blur-md text-gray-300 text-[10px] font-bold rounded-md flex items-center gap-1">
              REPLAY
            </span>
          )}

          <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-gray-200 text-[10px] font-semibold rounded-md flex items-center gap-1 border border-white/10">
            <Eye className="w-3 h-3 text-emerald-400" />
            {formatNumber(viewsCount || 1200)}
          </span>
        </div>

        {/* Play Icon Hover Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <div className="w-12 h-12 rounded-full bg-tokopedia-500/90 text-white flex items-center justify-center shadow-lg shadow-tokopedia-500/40 transform group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom Info inside thumbnail */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          <p className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-tokopedia-500 fill-tokopedia-500" />
            {channelName || 'Official Tokopedia'}
          </p>
          <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
            {titleImageThumbnail}
          </h3>
        </div>
      </div>
    </Link>
  );
});

VideoCard.displayName = 'VideoCard';
