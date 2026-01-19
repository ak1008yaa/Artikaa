
import React from 'react';
import { Artist, Product, Language } from '../types';
import ProductCard from '../components/ProductCard';

interface ArtistProfileProps {
  artist: Artist;
  products: Product[];
  lang: Language;
  onBuy: (p: Product) => void;
  onView: (p: Product) => void;
  onArtistClick: (name: string) => void;
}

const ArtistProfile: React.FC<ArtistProfileProps> = ({ 
  artist, 
  products, 
  lang, 
  onBuy, 
  onView,
  onArtistClick
}) => {
  // Filter products for this artist
  const artistProducts = products.filter(p => p.artist === artist.id || p.artist === artist.name);

  return (
    <div className="animate-fade-in-up">
      {/* Cinematic Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
         <img 
            src={artist.coverUrl} 
            alt={artist.name} 
            className="w-full h-full object-cover grayscale brightness-50"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
         
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-[1920px] mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-end">
                <img 
                  src={artist.portraitUrl} 
                  alt={artist.name} 
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-charcoal object-cover shadow-2xl"
                />
                <div className="mb-4">
                   <p className="text-mutedGold text-xs uppercase tracking-[0.2em] mb-2">{artist.location}</p>
                   <h1 className="font-serif text-5xl md:text-7xl text-white mb-2">{artist.name}</h1>
                   <p className="text-gray-400 font-serif italic text-xl">{artist.role}</p>
                </div>
            </div>
         </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-16 py-24">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Sidebar: Vision & Bio */}
            <div className="lg:col-span-4 space-y-12">
               <div>
                  <h3 className="text-xs font-bold text-mutedGold uppercase tracking-widest mb-6">The Vision</h3>
                  <div className="pl-6 border-l-2 border-mutedGold/50">
                     <p className="font-serif text-2xl text-white italic leading-relaxed">
                       "{artist.vision[lang]}"
                     </p>
                  </div>
               </div>

               <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Biography</h3>
                  <p className="text-gray-300 leading-loose text-sm font-light">
                    {artist.bio[lang]}
                  </p>
               </div>
            </div>

            {/* Main Content: Available Works */}
            <div className="lg:col-span-8">
               <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-4">
                  <h2 className="font-serif text-3xl text-white">Available Works</h2>
                  <span className="text-xs text-gray-500">{artistProducts.length} Unique Items</span>
               </div>

               {artistProducts.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {artistProducts.map(product => (
                       <div key={product.id} className="h-[450px]">
                          <ProductCard 
                            product={product}
                            lang={lang}
                            onBuy={onBuy}
                            onView={onView}
                            onArtistClick={onArtistClick}
                          />
                       </div>
                    ))}
                 </div>
               ) : (
                 <div className="py-20 text-center border border-dashed border-white/10 rounded-xl">
                    <p className="text-gray-500 italic font-serif">All works by {artist.name} have been acquired.</p>
                    <button className="mt-4 text-xs text-mutedGold uppercase tracking-widest hover:text-white">Notify me of new drops</button>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
