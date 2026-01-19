
import React from 'react';
import { CartItem } from '../types';
import { WALLETS, EXCHANGE_RATE } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency?: 'AMD' | 'USD';
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, currency = 'AMD', onRemove, onCheckout }) => {
  const totalAMD = items.reduce((acc, item) => acc + item.priceAMD, 0);
  const totalUSD = Math.round(totalAMD / EXCHANGE_RATE);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex justify-end">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-surface h-full shadow-2xl flex flex-col border-l border-white/10 animate-slide-in">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="font-serif text-2xl text-white">Your Selection</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
            ) : (
                items.map(item => (
                    <div key={item.cartId} className="flex gap-4">
                        <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover bg-charcoal" />
                        <div className="flex-1">
                            <h3 className="font-serif text-white text-sm">{item.title}</h3>
                            <p className="text-xs text-mutedGold mb-2">
                              {currency === 'AMD' ? `${item.priceAMD.toLocaleString()} ֏` : `$${Math.round(item.priceAMD / EXCHANGE_RATE).toLocaleString()}`}
                            </p>
                            <p className="text-[10px] text-gray-500 mb-2">Unique 1-of-1 Item</p>
                            <button onClick={() => onRemove(item.cartId)} className="text-[10px] text-red-400 hover:text-red-300 underline">Remove</button>
                        </div>
                    </div>
                ))
            )}
        </div>

        {items.length > 0 && (
            <div className="p-6 bg-charcoal border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-gray-400 uppercase tracking-widest">Total</span>
                    <span className="text-xl font-serif text-white">
                        {currency === 'AMD' ? `${totalAMD.toLocaleString()} ֏` : `$${totalUSD.toLocaleString()}`}
                    </span>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="p-4 bg-white/5 rounded border border-white/5">
                        <p className="text-xs text-mutedGold uppercase font-bold mb-2">Payment Options</p>
                        <p className="text-[10px] text-gray-400">Card to Card • Crypto • Secure Gateway</p>
                    </div>
                </div>

                <button 
                  onClick={onCheckout}
                  className="w-full py-4 bg-mutedGold text-charcoal font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
                >
                    Proceed to Checkout
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
