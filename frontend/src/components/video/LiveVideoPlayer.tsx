import React, { useState, useEffect } from 'react';
import { Heart, Eye, Share2, Volume2, VolumeX, Sparkles, ShoppingBag } from 'lucide-react';
import { DEFAULT_YOUTUBE_EMBED } from '../../utils/constants';
import { formatNumber } from '../../utils/formatters';
import { Video, Product } from '../../types';

interface LiveVideoPlayerProps {
  video?: Video | null;
  pinnedProduct?: Product | null;
  embedUrl?: string;
}

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
}

export const LiveVideoPlayer: React.FC<LiveVideoPlayerProps> = ({
  video,
  pinnedProduct,
  embedUrl = DEFAULT_YOUTUBE_EMBED,
}) => {
  const [likes, setLikes] = useState(video?.likesCount || 1240);
  const [viewers, setViewers] = useState(video?.viewsCount || 3420);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  // Simulate viewer fluctuation for live feel
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 7) - 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    setHasLiked(true);

    // Create a floating heart
    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      left: 20 + Math.random() * 60, // random percentage X offset
      size: 20 + Math.random() * 16,
    };

    setFloatingHearts((prev) => [...prev.slice(-15), newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2000);
  };

  const finalEmbed = video?.videoUrl || embedUrl;

  return (
    <div className="relative w-full aspect-[9/16] max-h-[750px] sm:aspect-[16/9] bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800/80 group">
      {/* Video Iframe */}
      <iframe
        title={video?.titleImageThumbnail || 'Live Streaming'}
        className="w-full h-full object-cover pointer-events-auto"
        src={`${finalEmbed}${finalEmbed.includes('?') ? '&' : '?'}autoplay=1&mute=${isMuted ? 1 : 0}&enablejsapi=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* Floating Hearts Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            style={{
              left: `${heart.left}%`,
              bottom: '80px',
              width: `${heart.size}px`,
              height: `${heart.size}px`,
            }}
            className="absolute animate-float-up text-emerald-400 drop-shadow-[0_0_8px_rgba(3,172,14,0.8)]"
          >
            <Heart className="w-full h-full fill-tokopedia-500 text-tokopedia-500" />
          </div>
        ))}
      </div>

      {/* HUD Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 flex items-center justify-between gap-3 pointer-events-auto">
        {/* Channel & Live Badge */}
        <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <div className="relative">
            <img
              src={video?.channelAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'}
              alt={video?.channelName || 'Official Store'}
              className="w-8 h-8 rounded-full border border-tokopedia-500 object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-tokopedia-500 rounded-full ring-2 ring-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white line-clamp-1">
              {video?.channelName || 'Tokopedia Official Live'}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-gray-300">
              <span className="px-1.5 py-0.2 bg-red-600 text-white font-extrabold rounded flex items-center gap-1 uppercase tracking-wider animate-pulse">
                • LIVE
              </span>
              <span className="flex items-center gap-0.5 text-gray-200">
                <Eye className="w-3 h-3 text-emerald-400" />
                {formatNumber(viewers)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/10 transition-transform active:scale-95"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            className="p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/10 transition-transform active:scale-95"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* HUD Bottom Bar - Title & Floating Pinned Product */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 flex flex-col gap-3 pointer-events-auto">
        
        {/* Stream Title */}
        <h1 className="text-sm sm:text-base font-bold text-white drop-shadow-md line-clamp-1 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
          {video?.titleImageThumbnail || 'Promo Tokopedia Play Spesial Hari Ini!'}
        </h1>

        {/* Pinned Featured Product Overlay Card */}
        {pinnedProduct && (
          <div className="glass-panel p-2.5 rounded-xl flex items-center justify-between gap-3 border border-emerald-500/30 bg-gray-950/80 backdrop-blur-lg shadow-xl animate-bounce-short">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={pinnedProduct.urlProduct}
                  alt={pinnedProduct.titleProduct}
                  className="w-12 h-12 object-cover rounded-lg border border-gray-700"
                />
                <span className="absolute -top-1 -left-1 px-1 bg-red-600 text-white text-[9px] font-bold rounded">
                  PINNED
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white line-clamp-1">
                  {pinnedProduct.titleProduct}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-tokopedia-500">
                    Rp {pinnedProduct.priceProduct.toLocaleString('id-ID')}
                  </span>
                  {pinnedProduct.discountPercent && (
                    <span className="px-1 py-0.2 bg-red-500/20 text-red-400 text-[10px] font-bold rounded">
                      -{pinnedProduct.discountPercent}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            <a
              href={pinnedProduct.urlProduct}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-tokopedia-500 hover:bg-tokopedia-600 text-white text-xs font-bold rounded-lg shadow-md shadow-tokopedia-500/30 flex items-center gap-1.5 transition-transform active:scale-95 flex-shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Beli
            </a>
          </div>
        )}

        {/* Floating Like Button Overlay */}
        <div className="absolute right-4 bottom-16 sm:bottom-20 flex flex-col items-center gap-1">
          <button
            onClick={handleLike}
            className={`p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg transition-transform active:scale-125 hover:scale-110 ${
              hasLiked ? 'text-tokopedia-500 border-tokopedia-500/50' : 'text-white'
            }`}
            aria-label="Like Video"
          >
            <Heart className={`w-6 h-6 ${hasLiked ? 'fill-tokopedia-500 text-tokopedia-500' : 'fill-white/20'}`} />
          </button>
          <span className="text-[11px] font-extrabold text-white bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
            {formatNumber(likes)}
          </span>
        </div>
      </div>
    </div>
  );
};
