import React, { useState } from 'react';
import { UI_TEXT } from '../constants';
import { Language } from '../types';

interface ContactPageProps {
  lang: Language;
}

const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate backend call
  };

  return (
    <div className="animate-fade-in-up pt-12 pb-24 max-w-7xl mx-auto px-6">
       <div className="text-center mb-16 transform preserve-3d">
          <span className="text-mutedGold text-5xl mb-4 block drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">✉</span>
          <h2 className="font-serif text-4xl md:text-6xl text-3d-gold mb-6">{UI_TEXT.contact_title[lang]}</h2>
          <p className="text-gray-400 max-w-xl mx-auto drop-shadow-md">{UI_TEXT.contact_subtitle[lang]}</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 perspective-[1500px]">
          {/* Contact Info - Floating Cards */}
          <div className="space-y-8 lg:order-2">
             <div className="bg-surface p-8 border border-white/5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:transform hover:translate-z-10 transition-transform">
                <h3 className="text-xs font-bold text-mutedGold uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Headquarters</h3>
                <p className="text-gray-300 mb-2 font-serif text-lg">Artikaa Atelier</p>
                <p className="text-gray-500 text-sm">12 Abovyan Street</p>
                <p className="text-gray-500 text-sm">Yerevan, 0010, Armenia</p>
             </div>
             
             <div className="bg-surface p-8 border border-white/5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <h3 className="text-xs font-bold text-mutedGold uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Direct Inquiries</h3>
                <p className="text-gray-300 mb-1 font-mono text-sm">acquisitions@artikaa.com</p>
                <p className="text-gray-500 text-sm mb-4">+374 99 123 456</p>
                <p className="text-[10px] text-gray-600 uppercase tracking-widest">Mon - Fri • 10:00 - 19:00 (GMT+4)</p>
             </div>

             <div className="bg-surface p-8 border border-white/5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <h3 className="text-xs font-bold text-mutedGold uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Digital Channels</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a href="https://t.me/artikaa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group p-2 rounded-xl hover:bg-white/5">
                    <span className="icon-orb w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    </span>
                    <span className="text-xs uppercase tracking-wider">Telegram</span>
                  </a>
                  <a href="https://wa.me/37499123456" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group p-2 rounded-xl hover:bg-white/5">
                    <span className="icon-orb w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.894-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    </span>
                    <span className="text-xs uppercase tracking-wider">WhatsApp</span>
                  </a>
                  <a href="https://instagram.com/artikaa_luxury" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group p-2 rounded-xl hover:bg-white/5">
                    <span className="icon-orb w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </span>
                    <span className="text-xs uppercase tracking-wider">Instagram</span>
                  </a>
                  <a href="https://youtube.com/@artikaa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group p-2 rounded-xl hover:bg-white/5">
                    <span className="icon-orb w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </span>
                    <span className="text-xs uppercase tracking-wider">YouTube</span>
                  </a>
                </div>
             </div>
          </div>

          {/* Form - Inset 3D Look */}
          <div className="lg:order-1">
             {submitted ? (
                <div className="h-full flex flex-col items-center justify-center p-12 bg-surface border border-mutedGold/20 rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                   <span className="text-6xl mb-4 animate-float">✨</span>
                   <p className="text-white font-serif text-xl text-center">{UI_TEXT.form_success[lang]}</p>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="group">
                      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 ml-1">{UI_TEXT.form_name[lang]}</label>
                      <input required type="text" className="input-inset w-full rounded-xl p-5 text-white focus:outline-none focus:ring-1 focus:ring-mutedGold/50 transition-all placeholder-gray-700" placeholder="Type here..." />
                   </div>
                   <div className="group">
                      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 ml-1">{UI_TEXT.form_email[lang]}</label>
                      <input required type="email" className="input-inset w-full rounded-xl p-5 text-white focus:outline-none focus:ring-1 focus:ring-mutedGold/50 transition-all placeholder-gray-700" placeholder="your@email.com" />
                   </div>
                   <div className="group">
                      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 ml-1">{UI_TEXT.form_subject[lang]}</label>
                      <div className="relative">
                        <select className="input-inset w-full rounded-xl p-5 text-white focus:outline-none focus:ring-1 focus:ring-mutedGold/50 transition-all appearance-none cursor-pointer">
                           <option>Acquisition Inquiry</option>
                           <option>Private Commission</option>
                           <option>Artist Collaboration</option>
                           <option>Press / Media</option>
                           <option>Other</option>
                        </select>
                        <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                      </div>
                   </div>
                   <div className="group">
                      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 ml-1">{UI_TEXT.form_message[lang]}</label>
                      <textarea required rows={6} className="input-inset w-full rounded-xl p-5 text-white focus:outline-none focus:ring-1 focus:ring-mutedGold/50 transition-all resize-none placeholder-gray-700" placeholder="How can we assist you?"></textarea>
                   </div>
                   <button type="submit" className="w-full btn-tactile bg-mutedGold text-charcoal py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:text-white transition-all transform hover:translate-y-[-2px]">
                      {UI_TEXT.form_send[lang]}
                   </button>
                </form>
             )}
          </div>
       </div>
    </div>
  );
};

export default ContactPage;