
import React from 'react';
import { Product, Language } from '../types';
import { EXCHANGE_RATE } from '../constants';

interface ProductCardProps {
  product: Product;
  lang: Language;
  currency?: 'AMD' | 'USD';
  onBuy: (p: Product) => void;
  onView?: (p: Product) => void;
  onArtistClick?: (artistName: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, lang, currency = 'AMD', onBuy, onView, onArtistClick }) => {
  
  const handleArtistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onArtistClick) {
      onArtistClick(product.artist);
    }
  };

  const handleView = () => {
    if (onView) onView(product);
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuy(product);
  };

  const displayPrice = currency === 'AMD' 
    ? `${product.priceAMD.toLocaleString()} ֏` 
    : `$${Math.round(product.priceAMD / EXCHANGE_RATE).toLocaleString()}`;

  return (
    <div className="card-3d-wrapper h-full relative z-0 hover:z-50 cursor-pointer" onClick={handleView}>
        <div className={`card-3d group relative h-full flex flex-col bg-surface rounded-xl overflow-hidden`}>
        
        {/* Specular Highlight Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Image Container */}
        <div className="relative flex-1 overflow-hidden">
            <div className="absolute inset-0 bg-gray-800 animate-pulse" /> {/* Placeholder */}
            
            {/* 3D Depth Layer */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60"></div>

            <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.15] opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0 will-change-transform"
            style={{ transformOrigin: 'center center' }}
            />
            
            {/* Overlay Actions - 3D Floating Buttons */}
            <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 pointer-events-none">
            <button 
                onClick={handleBuy}
                className="btn-tactile bg-mutedGold text-charcoal rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest text-shadow-sm hover:text-white transform transition-transform hover:scale-105 pointer-events-auto shadow-xl"
            >
                Acquire
            </button>
            </div>

            {/* Badges - Floating */}
            <div className="absolute top-4 left-4 z-20">
                <span className="px-2 py-1 bg-charcoal/80 text-white text-[10px] uppercase tracking-widest border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.5)] backdrop-blur-sm rounded-sm">
                {product.category}
                </span>
            </div>

            {/* Zoom Hint Icon */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white border border-white/20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                </div>
            </div>
        </div>

        {/* Minimal Info */}
        <div className="p-5 border-t border-white/5 bg-charcoal group-hover:bg-[#1a1a1a] transition-colors relative z-20">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-lg text-white leading-tight drop-shadow-md">
                    {product.title}
                </h3>
                <span className="font-sans text-sm text-mutedGold font-medium drop-shadow-sm">
                    {displayPrice}
                </span>
            </div>
            
            <div className="flex justify-between items-end">
                <div>
                    <p 
                        onClick={handleArtistClick}
                        className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 hover:text-white hover:underline cursor-pointer transition-colors"
                    >
                        {product.artist}
                    </p>
                    <p className="text-[10px] text-gray-600">{product.dimensions}</p>
                </div>
                {product.stock === 1 && (
                    <span className="text-[9px] text-red-400 border border-red-900/50 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(248,113,113,0.2)]">
                        One of a Kind
                    </span>
                )}
            </div>
        </div>
        </div>
    </div>
  );
};

export default ProductCard;
