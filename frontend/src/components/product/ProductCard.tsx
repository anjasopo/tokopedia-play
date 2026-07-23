import React, { memo } from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  isPinned?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = memo(({ product, onSelect, isPinned }) => {
  const { urlProduct, titleProduct, priceProduct, originalPrice, discountPercent, rating = 4.8 } = product;

  return (
    <div
      onClick={() => onSelect?.(product)}
      className={`group relative flex items-center gap-3 p-2.5 rounded-xl bg-gray-900/90 border transition-all duration-200 cursor-pointer ${
        isPinned
          ? 'border-tokopedia-500 bg-tokopedia-500/10 shadow-lg shadow-tokopedia-500/20'
          : 'border-gray-800/80 hover:border-emerald-500/50 hover:bg-gray-800/80'
      }`}
    >
      {/* Product Image */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-950 border border-gray-800">
        <img
          src={urlProduct}
          alt={titleProduct}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {discountPercent && (
          <span className="absolute top-1 left-1 px-1 py-0.2 bg-red-600 text-white text-[9px] font-bold rounded">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <h4 className="text-xs font-bold text-gray-100 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
            {titleProduct}
          </h4>
          <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-400">
            <Star className="w-3 h-3 fill-amber-400" />
            <span className="font-semibold">{rating}</span>
            <span className="text-gray-500">• Terjual 50+</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-1.5">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-[10px] text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
            <span className="text-xs sm:text-sm font-extrabold text-tokopedia-500">
              {formatPrice(priceProduct)}
            </span>
          </div>

          <a
            href={urlProduct}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-2.5 py-1 bg-tokopedia-500 hover:bg-tokopedia-600 text-white text-xs font-bold rounded-lg shadow-md shadow-tokopedia-500/20 flex items-center gap-1 transition-transform active:scale-95 flex-shrink-0"
          >
            <ShoppingBag className="w-3 h-3" />
            Beli
          </a>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
