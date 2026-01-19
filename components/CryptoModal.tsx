import React, { useState } from 'react';
import { Product, CryptoWallet } from '../types';
import { WALLETS, EXCHANGE_RATE } from '../constants';

interface CryptoModalProps {
  product: Product;
  onClose: () => void;
}

const CryptoModal: React.FC<CryptoModalProps> = ({ product, onClose }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>('Solana');
  const [copied, setCopied] = useState(false);

  const activeWallet = WALLETS.find(w => w.network === selectedNetwork) || WALLETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeWallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const priceUSD = Math.round(product.priceAMD / EXCHANGE_RATE);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative glass-card w-full max-w-lg p-8 rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.1)] border border-gold/20 transform transition-all animate-fadeIn">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">✕</button>
        
        <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-bold tracking-widest uppercase mb-4 border border-gold/20">
                Secure Gateway
            </div>
            <h2 className="font-serif text-3xl text-white">Initialize Transfer</h2>
        </div>
        
        <div className="flex gap-4 mb-8">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-obsidian border border-white/10 shrink-0">
                <img src={product.imageUrl} className="w-full h-full object-cover" alt={product.title} />
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Acquiring Asset</p>
                <h3 className="text-lg font-serif text-white leading-tight mb-2">{product.title}</h3>
                <div className="flex items-center gap-2">
                     <span className="text-gold font-bold text-xl">${priceUSD.toLocaleString()}</span>
                     <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">USD Equivalent</span>
                </div>
            </div>
        </div>

        <div className="mb-8">
          <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 block">Select Network</label>
          <div className="grid grid-cols-3 gap-3">
            {WALLETS.map(w => (
              <button
                key={w.network}
                onClick={() => setSelectedNetwork(w.network)}
                className={`py-3 text-xs font-bold uppercase rounded-xl border transition-all duration-300 ${
                  selectedNetwork === w.network 
                    ? 'bg-gold text-obsidian border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                    : 'bg-white/5 text-gray-400 border-white/5 hover:border-gold/30 hover:text-white'
                }`}
              >
                {w.network}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-obsidian/60 rounded-2xl border border-white/5 text-center group relative overflow-hidden">
          <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Deposit Address ({activeWallet.token})</p>
          
          <div 
            onClick={handleCopy}
            className="flex items-center justify-between gap-4 cursor-pointer"
          >
            <span className="font-mono text-sm text-white truncate opacity-80 group-hover:opacity-100 transition-opacity">
                {activeWallet.address}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-obsidian transition-colors">
               {copied ? '✓' : '❐'}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">
               Waiting for blockchain confirmation...
            </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoModal;