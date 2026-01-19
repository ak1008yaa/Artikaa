
import React, { useState, useEffect, useRef } from 'react';
import { Product, Category, Language, User, Order } from '../types';
import { generateProductContent, translateContent, generateSeoAudit } from '../services/geminiService';
import { EXCHANGE_RATE } from '../constants';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (p: Product) => void;
  users: User[];
  orders: Order[];
}

// Simulated Audio Engine for Admin Alerts
const SoundEngine = {
  ctx: null as AudioContext | null,
  init: () => {
    if (!SoundEngine.ctx) {
      SoundEngine.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  },
  playTone: (freq: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
    if (!SoundEngine.ctx) SoundEngine.init();
    const ctx = SoundEngine.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  },
  playEventSound: () => {
    SoundEngine.playTone(880, 'sine', 0.1);
    setTimeout(() => SoundEngine.playTone(1760, 'sine', 0.2), 100);
  },
  playSaleSound: () => {
    SoundEngine.playTone(440, 'square', 0.1);
    setTimeout(() => SoundEngine.playTone(554, 'square', 0.1), 100);
    setTimeout(() => SoundEngine.playTone(659, 'square', 0.4), 200);
  }
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, onAddProduct, users, orders }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'seo' | 'crm'>('overview');
  const [events, setEvents] = useState<{id: string, text: string, time: string}[]>([]);
  
  // Inventory State
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Furniture' as Category,
    price: '',
    visualCues: '',
    imageUrl: 'https://picsum.photos/seed/new/800/800'
  });
  const [generatedDesc, setGeneratedDesc] = useState<Record<string, string>>({ EN: '' });
  const [seoSuggestions, setSeoSuggestions] = useState<string[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);

  // Simulate Live Events
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newEvent = {
          id: Date.now().toString(),
          text: getRandomEvent(),
          time: new Date().toLocaleTimeString()
        };
        setEvents(prev => [newEvent, ...prev].slice(0, 10));
        SoundEngine.playEventSound();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getRandomEvent = () => {
    const actions = ['Viewed', 'Added to Cart', 'Wishlisted'];
    const items = products.map(p => p.title);
    const locations = ['Yerevan', 'Paris', 'Los Angeles', 'Moscow', 'Tehran'];
    return `User from ${locations[Math.floor(Math.random() * locations.length)]} ${actions[Math.floor(Math.random() * actions.length)]} "${items[Math.floor(Math.random() * items.length)]}"`;
  };

  const handleGenerateAI = async () => {
    if (!formData.title) return;
    setIsGenerating(true);
    try {
      const content = await generateProductContent(formData.title, formData.category, formData.visualCues);
      const translations = await translateContent(content.description, ['HY', 'RU', 'FA']);
      setGeneratedDesc({ EN: content.description, ...translations });
    } catch (e) {
      alert('AI Generation Failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generatedDesc.EN) return;
    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      priceAMD: Number(formData.price),
      imageUrl: formData.imageUrl,
      stock: 1,
      artist: 'Artikaa Atelier',
      description: generatedDesc as Record<Language, string>
    };
    onAddProduct(newProduct);
    SoundEngine.playSaleSound(); // Success sound
    setFormData({ ...formData, title: '', price: '', visualCues: '' });
    setGeneratedDesc({ EN: '' });
  };

  const handleRunSeoAudit = async () => {
    setIsAuditing(true);
    try {
        const titles = products.map(p => p.title);
        const suggestions = await generateSeoAudit(titles);
        setSeoSuggestions(suggestions);
    } catch (e) { console.error(e); } 
    finally { setIsAuditing(false); }
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] text-gray-300 font-mono flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
           <h1 className="text-xl font-bold text-white tracking-widest">ATELIER<br/><span className="text-xs text-gray-500">COMMAND CENTER</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
           <button onClick={() => setActiveTab('overview')} className={`w-full text-left p-3 rounded hover:bg-white/5 transition-colors ${activeTab === 'overview' ? 'bg-white/10 text-white' : ''}`}>
              Overview
           </button>
           <button onClick={() => setActiveTab('inventory')} className={`w-full text-left p-3 rounded hover:bg-white/5 transition-colors ${activeTab === 'inventory' ? 'bg-white/10 text-white' : ''}`}>
              Inventory Management
           </button>
           <button onClick={() => setActiveTab('seo')} className={`w-full text-left p-3 rounded hover:bg-white/5 transition-colors ${activeTab === 'seo' ? 'bg-white/10 text-white' : ''}`}>
              SEO Health
           </button>
           <button onClick={() => setActiveTab('crm')} className={`w-full text-left p-3 rounded hover:bg-white/5 transition-colors ${activeTab === 'crm' ? 'bg-white/10 text-white' : ''}`}>
              CRM & Orders
           </button>
        </nav>
        <div className="p-4 border-t border-gray-800 text-xs text-gray-600">
           System Status: <span className="text-green-500">OPERATIONAL</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-[#0f0f0f]">
           <div className="flex items-center gap-4">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest">Live Connection</span>
           </div>
           <button onClick={() => window.location.hash = ''} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest border border-gray-700 px-4 py-2 rounded">
              Exit to Website
           </button>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-auto p-8">
            {activeTab === 'overview' && (
                <div className="grid grid-cols-3 gap-8">
                   <div className="col-span-2 space-y-8">
                       <div className="grid grid-cols-3 gap-6">
                          <div className="p-6 bg-[#151515] rounded border border-gray-800">
                             <p className="text-xs uppercase text-gray-500 mb-2">Total Sales</p>
                             <p className="text-3xl text-white">4,285,000 ֏</p>
                          </div>
                          <div className="p-6 bg-[#151515] rounded border border-gray-800">
                             <p className="text-xs uppercase text-gray-500 mb-2">Registered Clients</p>
                             <p className="text-3xl text-green-400">{users.length}</p>
                          </div>
                          <div className="p-6 bg-[#151515] rounded border border-gray-800">
                             <p className="text-xs uppercase text-gray-500 mb-2">Stock Level</p>
                             <p className="text-3xl text-yellow-400">{products.length}</p>
                          </div>
                       </div>
                       
                       <div className="p-6 bg-[#151515] rounded border border-gray-800 h-[400px]">
                          <p className="text-xs uppercase text-gray-500 mb-4">Traffic Map (Simulated)</p>
                          <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-20 relative">
                              <div className="absolute top-[30%] left-[50%] w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                              <div className="absolute top-[40%] left-[20%] w-2 h-2 bg-blue-500 rounded-full animate-ping delay-700"></div>
                              <div className="absolute top-[35%] left-[55%] w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300"></div>
                          </div>
                       </div>
                   </div>

                   {/* Event Feed */}
                   <div className="bg-[#111] border border-gray-800 rounded p-4 h-[600px] flex flex-col">
                      <h3 className="text-xs font-bold uppercase text-gray-400 mb-4 pb-2 border-b border-gray-800">Live Website Events</h3>
                      <div className="flex-1 overflow-hidden relative">
                         <div className="space-y-3">
                            {events.map(e => (
                               <div key={e.id} className="p-3 bg-[#1a1a1a] border-l-2 border-green-500 text-xs animate-slide-in">
                                  <span className="text-gray-500 block mb-1">{e.time}</span>
                                  <span className="text-gray-300">{e.text}</span>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
            )}

            {activeTab === 'inventory' && (
                <div className="grid grid-cols-2 gap-12">
                   <div className="bg-[#151515] p-8 border border-gray-800 rounded">
                      <h2 className="text-lg text-white mb-6">Create New Asset</h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <input 
                           value={formData.title}
                           onChange={e => setFormData({...formData, title: e.target.value})}
                           placeholder="Item Title"
                           className="w-full bg-black border border-gray-700 p-3 text-white focus:border-green-500 outline-none"
                        />
                        <div className="flex gap-4">
                           <select 
                              value={formData.category}
                              onChange={e => setFormData({...formData, category: e.target.value as Category})}
                              className="bg-black border border-gray-700 p-3 text-white outline-none flex-1"
                           >
                              <option>Furniture</option>
                              <option>Jewelry</option>
                              <option>Apparel</option>
                           </select>
                           <input 
                              type="number"
                              value={formData.price}
                              onChange={e => setFormData({...formData, price: e.target.value})}
                              placeholder="Price (AMD)"
                              className="bg-black border border-gray-700 p-3 text-white outline-none flex-1"
                           />
                        </div>
                        <textarea 
                           value={formData.visualCues}
                           onChange={e => setFormData({...formData, visualCues: e.target.value})}
                           placeholder="Visual analysis cues for AI..."
                           className="w-full bg-black border border-gray-700 p-3 h-24 text-white outline-none resize-none"
                        ></textarea>
                        
                        <div className="flex gap-4">
                            <button type="button" onClick={handleGenerateAI} disabled={isGenerating} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 uppercase text-xs tracking-widest transition-colors">
                               {isGenerating ? 'Analyzing...' : 'Auto-Generate (AI)'}
                            </button>
                            {generatedDesc.EN && (
                                <button type="submit" className="flex-1 bg-green-900 hover:bg-green-800 text-white py-3 uppercase text-xs tracking-widest transition-colors">
                                    Deploy to Production
                                </button>
                            )}
                        </div>
                        
                        {generatedDesc.EN && (
                           <div className="p-4 bg-black border border-gray-800 text-xs text-gray-400 mt-4">
                              AI Output: {generatedDesc.EN}
                           </div>
                        )}
                      </form>
                   </div>
                   
                   <div className="bg-[#151515] p-8 border border-gray-800 rounded overflow-y-auto h-[600px]">
                      <h2 className="text-lg text-white mb-6">Database Entries</h2>
                      {products.map(p => (
                         <div key={p.id} className="flex items-center justify-between p-3 border-b border-gray-800 hover:bg-white/5">
                            <span className="text-sm">{p.title}</span>
                            <span className="text-xs text-gray-500">{p.priceAMD} ֏</span>
                         </div>
                      ))}
                   </div>
                </div>
            )}

            {activeTab === 'seo' && (
                <div className="max-w-4xl">
                    <div className="flex justify-between items-center mb-8">
                       <h2 className="text-lg text-white">SEO Diagnostic Tool</h2>
                       <button onClick={handleRunSeoAudit} disabled={isAuditing} className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 uppercase text-xs tracking-widest">
                          {isAuditing ? 'Scanning...' : 'Start Audit'}
                       </button>
                    </div>
                    <div className="space-y-2">
                       {seoSuggestions.length === 0 ? (
                           <p className="text-gray-500 italic">No active alerts.</p>
                       ) : (
                           seoSuggestions.map((s, i) => (
                               <div key={i} className="p-4 bg-[#151515] border-l-4 border-yellow-500 text-sm text-gray-300">
                                  {s}
                               </div>
                           ))
                       )}
                    </div>
                </div>
            )}

            {activeTab === 'crm' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-[#151515] p-6 rounded border border-gray-800">
                        <h2 className="text-white mb-4 uppercase text-sm tracking-widest border-b border-gray-700 pb-2">Registered Client Database</h2>
                        <div className="space-y-2 max-h-[500px] overflow-y-auto">
                            {users.map(u => (
                                <div key={u.id} className="p-3 bg-black/50 border border-gray-800 rounded text-xs flex justify-between items-center hover:bg-white/5">
                                    <div>
                                        <p className="text-white font-bold">{u.name}</p>
                                        <p className="text-gray-500">{u.email}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500">{u.phone}</p>
                                        <p className="text-gray-600 text-[10px]">{u.joinedAt}</p>
                                    </div>
                                </div>
                            ))}
                            {users.length === 0 && <p className="text-gray-500 italic">No registered users yet.</p>}
                        </div>
                    </div>

                    <div className="bg-[#151515] p-6 rounded border border-gray-800">
                        <h2 className="text-white mb-4 uppercase text-sm tracking-widest border-b border-gray-700 pb-2">Recent Orders</h2>
                        <div className="space-y-2 max-h-[500px] overflow-y-auto">
                            {orders.map(o => (
                                <div key={o.id} className="p-3 bg-black/50 border border-gray-800 rounded text-xs hover:bg-white/5">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-yellow-500 font-mono">{o.id}</span>
                                        <span className={`px-2 py-0.5 rounded ${o.status === 'Paid' ? 'bg-green-900 text-green-300' : 'bg-gray-800'}`}>{o.status}</span>
                                    </div>
                                    <p className="text-gray-400">Total: {o.totalAMD.toLocaleString()} AMD</p>
                                    <p className="text-gray-500 truncate mt-1">To: {o.shippingAddress}</p>
                                    <div className="mt-2 text-[10px] text-gray-600">
                                        {o.items.map(i => i.title).join(', ')}
                                    </div>
                                </div>
                            ))}
                            {orders.length === 0 && <p className="text-gray-500 italic">No orders yet.</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
