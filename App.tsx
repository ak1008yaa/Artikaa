
import React, { useState, useRef, useEffect } from 'react';
import Layout from './components/Layout';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import LegalModal from './components/LegalModal';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import AdminDashboard from './pages/AdminDashboard';
import ArtistProfile from './pages/ArtistProfile';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import { INITIAL_PRODUCTS, UI_TEXT, WALLETS, ARTISTS } from './constants';
import { Product, Language, CartItem, Artist, ChatMessage, User, Order } from './types';
import { chatWithAdvisor } from './services/geminiService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState<Language>('EN');
  const [currentCurrency, setCurrentCurrency] = useState<'AMD' | 'USD'>('AMD');
  const [currentView, setCurrentView] = useState<string>('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  
  // Admin Mode State
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // CRM / Auth State
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Artist State
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // View Product State
  const [viewedProduct, setViewedProduct] = useState<Product | null>(null);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Legal State
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);
  
  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatTyping, setIsChatTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Wallet State
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);

  // Initial Loader Effect
  useEffect(() => {
    // Simulate a cinematic load time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Check for Admin Mode on Mount via Hash
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminMode(true);
        setIsLoading(false); // Skip loader for admin
      } else {
        setIsAdminMode(false);
      }
    };
    window.addEventListener('hashchange', checkHash);
    checkHash(); // Initial check
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen]);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
  };

  // Handles both Registration and Login
  const handleAuth = (user: User) => {
    // Check if user exists (mock logic), if not add them
    const existing = users.find(u => u.email === user.email);
    if (!existing) {
        setUsers([...users, user]);
    }
    setCurrentUser(user);
  };

  const handleViewProduct = (product: Product) => {
    setViewedProduct(product);
  };

  const handleAddToCart = (product: Product) => {
    if (cartItems.some(item => item.id === product.id)) {
        setIsCartOpen(true);
        return;
    }
    const newItem: CartItem = { ...product, cartId: Date.now().toString() };
    setCartItems([...cartItems, newItem]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    if (!currentUser) {
        setIsAuthOpen(true);
    } else {
        setIsCheckoutOpen(true);
    }
  };

  const handleCompleteOrder = (order: Order) => {
    setOrders([order, ...orders]);
    setCartItems([]); // Clear cart
  };
  
  const handleArtistClick = (artistName: string) => {
    const artist = ARTISTS.find(a => a.id === artistName || a.name === artistName);
    if (artist) {
        setSelectedArtist(artist);
        setCurrentView('artist');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.warn(`Artist profile not found for: ${artistName}`);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatTyping(true);

    try {
      const response = await chatWithAdvisor(userMsg.text, chatMessages);
      setChatMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsChatTyping(false);
    }
  };

  const handleCopyWallet = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedWallet(address);
    setTimeout(() => setCopiedWallet(null), 2000);
  };

  const getBentoClass = (size?: string) => {
    switch(size) {
      case 'large': return 'col-span-1 md:col-span-2 row-span-2';
      case 'tall': return 'col-span-1 row-span-2';
      case 'medium': return 'col-span-1 md:col-span-2';
      default: return 'col-span-1'; 
    }
  };

  // Preloader Component
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-charcoal z-[999] flex flex-col items-center justify-center animate-fade-out" style={{animationDelay: '1.8s'}}>
         <div className="text-center space-y-4">
            <h1 className="font-serif text-3xl md:text-5xl text-3d-gold tracking-[0.2em] animate-pulse-slow">ARTIKAA</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em] animate-slide-in">Curating Silence</p>
         </div>
         <div className="mt-8 w-24 h-[1px] bg-white/10 overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-full bg-mutedGold animate-slide-in duration-[2s]"></div>
         </div>
      </div>
    );
  }

  // If in Admin Mode, Render Independent Admin App
  if (isAdminMode) {
    return (
      <AdminDashboard 
        products={products} 
        onAddProduct={handleAddProduct} 
        users={users}
        orders={orders}
      />
    );
  }

  return (
    <Layout 
      currentLang={currentLang} 
      setLang={setCurrentLang} 
      currentCurrency={currentCurrency}
      setCurrency={setCurrentCurrency}
      currentView={currentView}
      setView={setCurrentView}
      cartCount={cartItems.length}
      onOpenCart={() => setIsCartOpen(true)}
      onOpenLegal={setLegalModalType}
      user={currentUser}
      onOpenAuth={() => setIsAuthOpen(true)}
    >
      {/* Persistent Floating Chat Button (Concierge) */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-mutedGold text-charcoal shadow-[0_0_20px_rgba(197,160,89,0.4)] flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
          aria-label="Open Concierge"
        >
          <span className="text-2xl group-hover:rotate-12 transition-transform">✦</span>
          <span className="absolute right-full mr-4 bg-white/10 backdrop-blur px-3 py-1 rounded text-xs text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Concierge
          </span>
        </button>
      )}

      {currentView === 'home' && (
        <>
          {/* Immersive Hero Section - 3D Parallax Feel */}
          <section id="home" className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-charcoal perspective-[2000px]">
            <div className="absolute inset-0 z-0 opacity-40 transform translate-z-[-100px] scale-[1.1]">
                <img src="https://picsum.photos/seed/luxuryhero/1920/1080" className="w-full h-full object-cover grayscale" alt="Luxury Interior" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/50"></div>
            </div>
            
            <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in-up transform-style-3d">
              <span className="block font-sans text-xs md:text-sm text-mutedGold tracking-[0.3em] uppercase mb-6 drop-shadow-md">
                Est. 2024 • Yerevan
              </span>
              <h1 className="font-serif text-5xl md:text-8xl text-3d-gold mb-8 leading-[1.1] transform translate-z-[50px]">
                {UI_TEXT.hero_title[currentLang]}
              </h1>
              <p className="font-sans text-gray-300 text-sm md:text-lg font-light mb-10 max-w-2xl mx-auto leading-relaxed opacity-90 drop-shadow-lg">
                {UI_TEXT.hero_subtitle[currentLang]}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => document.getElementById('manifesto')?.scrollIntoView({behavior: 'smooth'})}
                  className="btn-tactile px-8 py-4 bg-softWhite text-charcoal rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-mutedGold transition-colors"
                >
                  Discover the Philosophy
                </button>
              </div>
            </div>
          </section>

          {/* New Section: The Manifesto / Intentional Living Statement */}
          <section id="manifesto" className="py-32 bg-charcoal relative border-t border-white/5">
              <div className="max-w-3xl mx-auto px-6 text-center">
                  <p className="text-mutedGold text-xs uppercase tracking-[0.3em] mb-8 animate-float">Our Belief</p>
                  <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-8">
                     "We do not sell objects. We curate time, touch, and truth."
                  </h2>
                  <p className="text-gray-400 font-light text-lg leading-relaxed mb-12">
                     In a world of mass production, Artikaa stands for the slow, the deliberate, and the eternal. Every acquisition here is a rebellion against the disposable.
                  </p>
                  <div className="w-px h-20 bg-gradient-to-b from-mutedGold to-transparent mx-auto"></div>
              </div>
          </section>

          {/* Marquee */}
          <div className="w-full border-y border-white/5 py-6 bg-charcoal overflow-hidden shadow-inner">
            <div className="flex animate-marquee whitespace-nowrap gap-16">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 opacity-50">
                    <span className="text-xl text-mutedGold animate-float" style={{animationDelay: `${i}s`}}>✦</span>
                    <span className="text-sm font-serif italic text-gray-400">Intentional Living • Heirloom Quality • Soulful Origins</span>
                </div>
              ))}
            </div>
          </div>

          {/* The Masters - The Artisans (Shifted up to emphasize connection before product) */}
          <section id="artisans" className="py-24 max-w-[1920px] mx-auto px-6 md:px-12 bg-surface relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mutedGold/5 rounded-full blur-[100px] pointer-events-none"></div>
             <div className="text-center mb-16">
                <h2 className="text-xs text-mutedGold font-bold uppercase tracking-[0.3em] mb-4">The Hands</h2>
                <h3 className="font-serif text-4xl text-white">Meet the Makers</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {ARTISTS.map(artist => (
                   <div key={artist.id} className="group relative h-[450px] rounded-xl overflow-hidden cursor-pointer shadow-2xl" onClick={() => handleArtistClick(artist.id)}>
                      <img src={artist.coverUrl} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 grayscale group-hover:grayscale-0" alt={artist.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                      <div className="absolute bottom-0 left-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                         <h4 className="font-serif text-4xl text-white mb-2">{artist.name}</h4>
                         <p className="text-xs text-mutedGold uppercase tracking-widest mb-4">{artist.location}</p>
                         <p className="text-gray-300 text-sm max-w-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity delay-100 font-light leading-relaxed">
                            {artist.bio[currentLang]}
                         </p>
                         <span className="text-xs text-white border-b border-mutedGold pb-1 uppercase tracking-widest group-hover:text-mutedGold transition-colors">Enter Atelier</span>
                      </div>
                   </div>
                ))}
             </div>
          </section>

          {/* Collection - The Artifacts */}
          <section id="collection" className="py-24 max-w-[1920px] mx-auto px-6 md:px-12">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div>
                   <h2 className="text-xs text-mutedGold font-bold uppercase tracking-[0.3em] mb-2">The Artifacts</h2>
                   <h3 className="font-serif text-4xl text-3d-gold">Curated for Legacy</h3>
               </div>
               <div className="hidden md:flex gap-4">
                  {['All', 'Fine Art', 'Jewelry', 'Apparel', 'Furniture'].map(filter => (
                     <button key={filter} className="text-xs text-gray-500 hover:text-white uppercase tracking-wider transition-colors px-4 py-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10">
                        {filter}
                     </button>
                  ))}
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-[400px] perspective-[2000px]">
                {products.map((product) => (
                  <div key={product.id} className={`${getBentoClass(product.bentoSize)} transform transition-all duration-500 hover:z-20`}>
                    <ProductCard 
                      product={product} 
                      lang={currentLang}
                      currency={currentCurrency}
                      onBuy={handleAddToCart}
                      onView={handleViewProduct}
                      onArtistClick={handleArtistClick}
                    />
                  </div>
                ))}
             </div>
          </section>

          {/* About / Philosophy Details */}
          <section id="about" className="py-24 max-w-[1920px] mx-auto px-6 md:px-12 bg-charcoal">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center perspective-[1500px]">
                <div className="space-y-8">
                   <h2 className="font-sans text-xs text-mutedGold font-bold tracking-[0.3em] uppercase drop-shadow-sm">
                     {UI_TEXT.nav_about[currentLang]}
                   </h2>
                   <h3 className="font-serif text-4xl md:text-6xl text-white leading-tight drop-shadow-xl">
                     {UI_TEXT.about_title[currentLang]}
                   </h3>
                   <div className="w-20 h-[1px] bg-gradient-to-r from-mutedGold to-transparent"></div>
                   <p className="font-sans text-gray-400 text-lg leading-relaxed font-light">
                     {UI_TEXT.about_desc[currentLang]}
                   </p>
                </div>
                <div className="relative transform-style-3d hover:rotate-y-[-5deg] transition-transform duration-1000">
                   <div className="aspect-[3/4] overflow-hidden bg-surface rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                      <img src="https://picsum.photos/seed/artist/800/1200" alt="Artist at work" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" />
                   </div>
                   <div className="absolute -bottom-6 -left-6 bg-charcoal/90 backdrop-blur p-8 border border-white/10 rounded-xl max-w-xs shadow-[0_10px_30px_rgba(0,0,0,0.8)] transform translate-z-[30px]">
                      <p className="font-serif text-xl text-white italic mb-2">"True luxury is the absence of noise."</p>
                      <p className="text-xs text-mutedGold uppercase tracking-widest">— Davtian, Master Jeweler</p>
                   </div>
                </div>
             </div>
          </section>

          {/* AI Advisory Section (Replaced by Chat Trigger) */}
          <section id="advisory" className="py-32 bg-surface border-y border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-transparent to-charcoal z-0"></div>
             <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
                <span className="text-mutedGold text-5xl mb-4 block animate-float">✧</span>
                <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 drop-shadow-lg">Artikaa Private Concierge</h2>
                <p className="text-gray-400 mb-10 max-w-xl mx-auto font-light">
                   Do you seek the story behind the object? Our Concierge is available to discuss provenance, materials, and the spiritual weight of our collection.
                </p>
                <button 
                   onClick={() => setIsChatOpen(true)}
                   className="btn-tactile px-8 py-4 bg-charcoal rounded-full border border-white/10 text-white text-xs uppercase tracking-widest hover:border-mutedGold transition-colors"
                >
                   Speak with Concierge
                </button>
             </div>
          </section>

          {/* Support */}
          <section id="support" className="py-24 max-w-[1920px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-charcoal border border-white/5 p-12 relative overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
               <div className="relative z-10">
                  <h2 className="font-serif text-3xl text-white mb-6">{UI_TEXT.support_title[currentLang]}</h2>
                  <p className="text-gray-400 mb-8 max-w-md">{UI_TEXT.support_subtitle[currentLang]}</p>
                  
                  <div className="space-y-4">
                     {WALLETS.map(w => (
                        <div 
                           key={w.network} 
                           onClick={() => handleCopyWallet(w.address)}
                           className="flex items-center justify-between p-4 bg-surface border border-white/5 rounded-xl hover:border-mutedGold/50 transition-colors group cursor-pointer shadow-md hover:transform hover:translate-x-2"
                        >
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs text-mutedGold shadow-inner">
                                 {w.token[0]}
                              </div>
                              <div>
                                 <p className="text-xs text-white font-bold uppercase">{w.network}</p>
                                 <p className="text-[10px] text-gray-500 font-mono">{w.address.substring(0, 12)}...</p>
                              </div>
                           </div>
                           <span className="text-xs text-gray-500 group-hover:text-white transition-colors">
                              {copiedWallet === w.address ? 'Copied' : 'Copy'}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="relative z-10 flex items-center justify-center border-l border-white/5 pl-12">
                  <div className="text-center transform rotate-[-5deg]">
                     <p className="font-serif text-8xl text-3d-gold mb-2 drop-shadow-2xl">100%</p>
                     <p className="text-xs text-gray-500 uppercase tracking-widest">Direct to Artisan</p>
                  </div>
               </div>
               
               <div className="absolute top-0 right-0 w-64 h-64 bg-mutedGold/5 rounded-full blur-[80px]"></div>
            </div>
          </section>
        </>
      )}

      {currentView === 'artist' && selectedArtist && (
        <ArtistProfile 
            artist={selectedArtist}
            products={products}
            lang={currentLang}
            onBuy={handleAddToCart}
            onView={handleViewProduct}
            onArtistClick={handleArtistClick}
        />
      )}
      
      {currentView === 'contact' && (
        <ContactPage lang={currentLang} />
      )}

      {currentView === 'blog' && (
        <BlogPage lang={currentLang} />
      )}

      {/* Cart Drawer */}
      <CartDrawer 
         isOpen={isCartOpen}
         onClose={() => setIsCartOpen(false)}
         items={cartItems}
         currency={currentCurrency}
         onRemove={handleRemoveFromCart}
         onCheckout={handleProceedToCheckout}
      />

      {/* Product Detail Modal */}
      {viewedProduct && (
        <ProductModal 
            product={viewedProduct}
            lang={currentLang}
            currency={currentCurrency}
            onClose={() => setViewedProduct(null)}
            onBuy={handleAddToCart}
        />
      )}

      {/* Legal Modal */}
      <LegalModal 
        type={legalModalType} 
        onClose={() => setLegalModalType(null)} 
      />

      {/* Auth Modal */}
      {isAuthOpen && (
          <AuthModal 
            onClose={() => setIsAuthOpen(false)}
            onRegister={handleAuth}
            lang={currentLang}
          />
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
          <CheckoutModal 
            onClose={() => setIsCheckoutOpen(false)}
            onComplete={handleCompleteOrder}
            items={cartItems}
            user={currentUser}
            lang={currentLang}
            currency={currentCurrency}
          />
      )}

      {/* Chat Interface Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
           <div className="bg-surface w-full max-w-lg h-[600px] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
               <div className="p-4 border-b border-white/10 bg-charcoal flex justify-between items-center">
                   <h3 className="text-white font-serif">Artikaa Concierge</h3>
                   <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white">✕</button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.length === 0 && (
                      <div className="text-center text-gray-500 mt-20">
                          <p className="text-4xl mb-4">✧</p>
                          <p className="text-sm">I can assist you with provenance, materials, or the philosophy of our collection.</p>
                      </div>
                  )}
                  {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-mutedGold text-charcoal' : 'bg-white/10 text-gray-200'}`}>
                              {msg.text}
                          </div>
                      </div>
                  ))}
                  {isChatTyping && (
                      <div className="flex justify-start">
                          <div className="bg-white/10 p-3 rounded-xl flex gap-1">
                              <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                              <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                              <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                          </div>
                      </div>
                  )}
                  <div ref={chatEndRef} />
               </div>

               <form onSubmit={handleChatSubmit} className="p-4 bg-charcoal border-t border-white/10">
                   <div className="flex gap-2">
                       <input 
                          type="text" 
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Ask about provenance..." 
                          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white focus:border-mutedGold outline-none"
                       />
                       <button type="submit" className="bg-mutedGold text-charcoal w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-white transition-colors">
                           ↑
                       </button>
                   </div>
               </form>
           </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
