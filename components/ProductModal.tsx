
import React, { useState } from 'react';
import { Product, Language } from '../types';
import { EXCHANGE_RATE } from '../constants';

interface ProductModalProps {
  product: Product;
  lang: Language;
  currency: 'AMD' | 'USD';
  onClose: () => void;
  onBuy: (p: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, lang, currency, onClose, onBuy }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const displayPrice = currency === 'AMD'
    ? `${product.priceAMD.toLocaleString()} ֏`
    : `$${Math.round(product.priceAMD / EXCHANGE_RATE).toLocaleString()}`;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity" onClick={onClose}></div>
      
      {/* Main Modal Card */}
      <div className={`relative w-full max-w-6xl h-full max-h-[90vh] bg-charcoal border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up ${isZoomed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
        >
          ✕
        </button>

        {/* Image Section - Clickable for Zoom */}
        <div 
          className="w-full md:w-3/5 h-[40vh] md:h-full relative bg-surface overflow-hidden group cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-[3s] ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60 md:opacity-0"></div>
          
          {/* Zoom Hint */}
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
             <span className="bg-black/60 backdrop-blur text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
               Enlarge View
             </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-2/5 h-full overflow-y-auto bg-charcoal p-8 md:p-12 flex flex-col relative">
          
          <div className="mb-auto">
            <div className="flex items-center gap-3 mb-6">
               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-mutedGold">
                 {product.category}
               </span>
               {product.stock === 1 && (
                 <span className="px-3 py-1 bg-red-900/20 border border-red-900/50 rounded-full text-[10px] uppercase tracking-widest text-red-400">
                   Unique 1-of-1
                 </span>
               )}
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
              {product.title}
            </h2>
            
            <p className="font-serif text-2xl text-mutedGold mb-8">
               {displayPrice}
            </p>

            <div className="h-px w-full bg-white/10 mb-8"></div>

            <div className="prose prose-invert prose-sm">
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">The Narrative</h3>
               <p className="text-gray-300 font-light leading-relaxed text-lg mb-8">
                 {product.description[lang]}
               </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
               <div>
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Dimensions</h4>
                  <p className="text-white font-mono text-sm">{product.dimensions || 'Bespoke'}</p>
               </div>
               <div>
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Artisan</h4>
                  <p className="text-white font-serif text-sm">{product.artist}</p>
               </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
             <button 
               onClick={(e) => {
                 e.stopPropagation();
                 onBuy(product);
                 onClose();
               }}
               className="w-full btn-tactile bg-mutedGold text-charcoal py-5 rounded-xl font-bold text-sm uppercase tracking-[0.2em] hover:text-white transition-all shadow-[0_10px_30px_rgba(197,160,89,0.2)]"
             >
               Acquire Object
             </button>
             <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-wider">
                Certified Authentic • Insured Global Shipping
             </p>
          </div>

        </div>
      </div>

      {/* Lightbox / Full Screen Image Overlay */}
      {isZoomed && (
        <div 
            className="fixed inset-0 z-[150] bg-black/98 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in-up"
            onClick={() => setIsZoomed(false)}
        >
            <div className="relative max-w-full max-h-full flex flex-col items-center">
                 <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="max-w-[95vw] max-h-[85vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-sm"
                 />
                 <div className="mt-6 text-center">
                    <h3 className="text-white font-serif text-2xl mb-1">{product.title}</h3>
                    <p className="text-[10px] text-mutedGold uppercase tracking-[0.3em]">Full Detail View</p>
                 </div>
            </div>
            
            <button 
                onClick={() => setIsZoomed(false)}
                className="absolute top-8 right-8 text-gray-500 hover:text-white text-xl transition-colors"
            >
                ✕ CLOSE
            </button>
        </div>
      )}
    </div>
  );
};

export default ProductModal;
