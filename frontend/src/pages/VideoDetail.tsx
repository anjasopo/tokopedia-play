import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, MessageSquare, ArrowLeft, AlertCircle } from 'lucide-react';
import { getVideoById } from '../api/video.api';
import { getProducts } from '../api/product.api';
import { useSocketComments } from '../hooks/useSocketComments';
import { LiveVideoPlayer } from '../components/video/LiveVideoPlayer';
import { ProductCard } from '../components/product/ProductCard';
import { LiveChatOverlay } from '../components/comment/LiveChatOverlay';
import { LoadingSpinner, ErrorMessage } from '../components/common/ErrorBoundary';
import { ROUTES } from '../utils/constants';
import { Product } from '../types';

export const VideoDetail: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [activeTab, setActiveTab] = useState<'products' | 'chat'>('products');
  const [selectedPinnedProduct, setSelectedPinnedProduct] = useState<Product | null>(null);

  // Fetch Video Detail
  const {
    data: video,
    isLoading: videoLoading,
  } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => (videoId ? getVideoById(videoId) : Promise.resolve(null)),
    enabled: !!videoId,
  });

  // Fetch Related Products
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ['products', videoId],
    queryFn: () => (videoId ? getProducts({ videoID: videoId }) : Promise.resolve([])),
    enabled: !!videoId,
  });

  // Socket.IO Real-time Comments Hook
  const {
    comments,
    loading: commentsLoading,
    posting,
    postComment,
  } = useSocketComments(videoId);

  // Default pinned product to first product if not manually chosen
  const pinnedProduct = selectedPinnedProduct || (products.length > 0 ? products[0] : null);

  if (videoLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <LoadingSpinner label="Memuat Ruang Live Tokopedia..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 space-y-4">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800 hover:border-gray-700 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda Live
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-tokopedia-500 animate-pulse" />
          <span>Tokopedia Play Live Stream Room</span>
        </div>
      </div>

      {/* Main Live Room Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Live Video Player (8 cols on desktop) */}
        <div className="lg:col-span-8 w-full">
          <LiveVideoPlayer
            video={video}
            pinnedProduct={pinnedProduct}
          />
        </div>

        {/* Right Column: Tabbed Panel (Products & Live Chat - 4 cols on desktop) */}
        <div className="lg:col-span-4 w-full h-[650px] flex flex-col bg-gray-950 rounded-2xl border border-gray-800/80 overflow-hidden shadow-2xl">
          
          {/* Tab Navigation Header */}
          <div className="flex border-b border-gray-800 bg-gray-900/90">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-3 text-xs font-extrabold flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'products'
                  ? 'border-tokopedia-500 text-tokopedia-500 bg-tokopedia-500/10'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Produk ({products.length})
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-xs font-extrabold flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'chat'
                  ? 'border-tokopedia-500 text-tokopedia-500 bg-tokopedia-500/10'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Live Chat ({comments.length})
            </button>
          </div>

          {/* Tab 1: Products Panel */}
          {activeTab === 'products' && (
            <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-900/50">
              {productsLoading ? (
                <div className="py-12 text-center">
                  <LoadingSpinner label="Memuat produk promo..." />
                </div>
              ) : productsError ? (
                <ErrorMessage message="Gagal memuat produk promo" />
              ) : products.length === 0 ? (
                <div className="py-16 text-center text-xs text-gray-500 space-y-2">
                  <AlertCircle className="w-8 h-8 mx-auto text-gray-600" />
                  <p>Tidak ada produk terkait untuk video ini.</p>
                </div>
              ) : (
                products.map((item) => (
                  <ProductCard
                    key={item._id}
                    product={item}
                    isPinned={pinnedProduct?._id === item._id}
                    onSelect={(p) => setSelectedPinnedProduct(p)}
                  />
                ))
              )}
            </div>
          )}

          {/* Tab 2: Live Chat Overlay Panel */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <LiveChatOverlay
                comments={comments}
                loading={commentsLoading}
                posting={posting}
                onPostComment={postComment}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
