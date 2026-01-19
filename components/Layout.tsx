
import React, { useState, useEffect } from 'react';
import { UI_TEXT } from '../constants';
import { Language, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentLang: Language;
  setLang: (l: Language) => void;
  currentCurrency: 'AMD' | 'USD';
  setCurrency: (c: 'AMD' | 'USD') => void;
  currentView: string;
  setView: (v: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenLegal: (type: 'terms' | 'privacy') => void;
  user: User | null;
  onOpenAuth: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, currentLang, setLang, currentCurrency, setCurrency, currentView, setView, cartCount, onOpenCart, onOpenLegal, user, onOpenAuth 
}) => {
  const isRTL = currentLang === 'FA';
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'home' || id === 'contact' || id === 'blog') {
      setView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('home'); 
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="flex flex-col min-h-[100dvh] bg-charcoal text-softWhite font-sans selection:bg-mutedGold selection:text-charcoal overflow-x-hidden perspective-wrapper">
      
      {/* Background Ambience - Deep Space */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#121212]">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-mutedGold/5 blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/5 blur-[120px]"></div>
      </div>

      {/* 3D Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-charcoal/80 backdrop-blur-xl py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1920px] mx-auto px-6 flex items-center justify-between">
            {/* Logo - Extruded Look */}
            <div className="flex-shrink-0 cursor-pointer group transform hover:scale-105 transition-transform duration-500 z-50" onClick={() => handleNavClick('home')}>
              <h1 className="font-serif text-2xl tracking-[0.1em] text-3d-gold drop-shadow-xl">
                ARTIKAA
              </h1>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden z-50">
               <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
                  <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
               </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-charcoal/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                 {[
                { id: 'collection', label: UI_TEXT.nav_collection[currentLang] },
                { id: 'blog', label: UI_TEXT.nav_blog[currentLang] },
                { id: 'about', label: UI_TEXT.nav_about[currentLang] },
                { id: 'support', label: UI_TEXT.nav_support[currentLang] },
                { id: 'contact', label: UI_TEXT.nav_contact[currentLang] },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-2xl font-serif text-white hover:text-mutedGold transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Links - Floating */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              {[
                { id: 'collection', label: UI_TEXT.nav_collection[currentLang] },
                { id: 'blog', label: UI_TEXT.nav_blog[currentLang] },
                { id: 'about', label: UI_TEXT.nav_about[currentLang] },
                { id: 'support', label: UI_TEXT.nav_support[currentLang] },
                { id: 'contact', label: UI_TEXT.nav_contact[currentLang] },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 relative group py-2 px-3 rounded-lg hover:bg-white/5 hover:shadow-lg ${
                    currentView === item.id ? 'text-mutedGold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-[2px] bg-mutedGold transition-all duration-300 shadow-[0_0_10px_#C5A059] ${currentView === item.id ? 'w-1/2 opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50'}`}></span>
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 md:gap-6 z-50">
               {/* Auth Button */}
               <button onClick={onOpenAuth} className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-mutedGold hover:text-white transition-colors">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {user ? user.name : UI_TEXT.btn_signin[currentLang]}
               </button>

               <button onClick={onOpenCart} className="text-gray-400 hover:text-white transition-colors relative p-2 rounded-full hover:bg-white/5 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]">
                  <svg className="w-5 h-5 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-mutedGold to-yellow-600 text-charcoal text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                      {cartCount}
                    </span>
                  )}
               </button>
               
               {/* Currency Toggle - Compact on mobile */}
               <div className="flex bg-white/5 rounded-lg overflow-hidden border border-white/10">
                   <button 
                     onClick={() => setCurrency('AMD')} 
                     className={`px-2 md:px-3 py-1 text-[10px] font-bold ${currentCurrency === 'AMD' ? 'bg-mutedGold text-charcoal' : 'text-gray-400 hover:text-white'}`}
                   >
                     AMD
                   </button>
                   <button 
                     onClick={() => setCurrency('USD')} 
                     className={`px-2 md:px-3 py-1 text-[10px] font-bold ${currentCurrency === 'USD' ? 'bg-mutedGold text-charcoal' : 'text-gray-400 hover:text-white'}`}
                   >
                     USD
                   </button>
               </div>

               {/* Language Minimalist */}
               <div className="relative group hidden md:block">
                <button className="text-xs font-bold text-mutedGold tracking-widest uppercase hover:text-white transition-colors p-2">
                  {currentLang}
                </button>
                <div className="absolute right-0 top-full pt-4 w-24 hidden group-hover:block perspective-[1000px]">
                   <div className="bg-surface/90 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden py-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] transform rotateX(5deg)">
                      {(['EN', 'HY', 'RU', 'FA'] as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLang(lang)}
                          className="block w-full text-left px-4 py-2 text-[10px] font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {lang}
                        </button>
                      ))}
                   </div>
                </div>
              </div>
            </div>
        </div>
      </nav>

      {/* Main Content - Pushed back slightly for parallax feel - Added flex-grow to push footer down */}
      <main className="relative z-10 pt-20 flex-grow">
        {children}
      </main>

      {/* 3D Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-charcoal pt-12 md:pt-20 mt-auto shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pb-4 w-full">
        <div className="max-w-[1920px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
               <div>
                  <h2 className="font-serif text-4xl text-3d-gold mb-6">ARTIKAA</h2>
                  <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-8">
                    A bridge between tangible heritage and your home.
                  </p>
                  
                  {/* 3D Social Media Orb Icons - Enhanced */}
                  <div className="flex gap-6 perspective-[500px]">
                    <a href="https://t.me/artikaa" target="_blank" rel="noopener noreferrer" className="icon-orb w-14 h-14" aria-label="Telegram">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    </a>
                    <a href="https://wa.me/37499123456" target="_blank" rel="noopener noreferrer" className="icon-orb w-14 h-14" aria-label="WhatsApp">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.894-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    </a>
                    <a href="https://instagram.com/artikaa_luxury" target="_blank" rel="noopener noreferrer" className="icon-orb w-14 h-14" aria-label="Instagram">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="https://youtube.com/@artikaa" target="_blank" rel="noopener noreferrer" className="icon-orb w-14 h-14" aria-label="YouTube">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </a>
                  </div>

               </div>
               <div className="grid grid-cols-2 gap-12 mt-12 md:mt-0">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Explore</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                      <li className="hover:text-mutedGold cursor-pointer transition transform hover:translate-x-2" onClick={() => handleNavClick('collection')}>Collection</li>
                      <li className="hover:text-mutedGold cursor-pointer transition transform hover:translate-x-2" onClick={() => handleNavClick('blog')}>Journal</li>
                      <li className="hover:text-mutedGold cursor-pointer transition transform hover:translate-x-2" onClick={() => handleNavClick('about')}>About</li>
                      <li className="hover:text-mutedGold cursor-pointer transition transform hover:translate-x-2" onClick={() => handleNavClick('contact')}>Concierge</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Legal</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                      <li className="hover:text-mutedGold cursor-pointer transition transform hover:translate-x-2" onClick={() => onOpenLegal('terms')}>Terms & Conditions</li>
                      <li className="hover:text-mutedGold cursor-pointer transition transform hover:translate-x-2" onClick={() => onOpenLegal('privacy')}>Privacy Policy</li>
                    </ul>
                  </div>
               </div>
            </div>
            
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <p className="text-[10px] text-gray-700 font-mono uppercase tracking-widest">
                    © 2024 Artikaa Luxury. Handcrafted in Armenia.
                </p>
                <div className="flex gap-8">
                    <span className="text-[10px] text-gray-700 font-mono uppercase tracking-widest cursor-pointer hover:text-gray-400 transition-colors">Imprint</span>
                    <span onClick={() => onOpenLegal('privacy')} className="text-[10px] text-gray-700 font-mono uppercase tracking-widest cursor-pointer hover:text-gray-400 transition-colors">Privacy</span>
                    <span onClick={() => onOpenLegal('terms')} className="text-[10px] text-gray-700 font-mono uppercase tracking-widest cursor-pointer hover:text-gray-400 transition-colors">Terms</span>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
