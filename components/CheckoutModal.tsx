
import React, { useState } from 'react';
import { User, CartItem, Language, Order } from '../types';
import { UI_TEXT, EXCHANGE_RATE, WALLETS } from '../constants';

interface CheckoutModalProps {
  onClose: () => void;
  onComplete: (order: Order) => void;
  items: CartItem[];
  user: User | null;
  lang: Language;
  currency: 'AMD' | 'USD';
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, onComplete, items, user, lang, currency }) => {
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('Solana');
  const [txHash, setTxHash] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const totalAMD = items.reduce((acc, item) => acc + item.priceAMD, 0);
  const totalUSD = Math.round(totalAMD / EXCHANGE_RATE);
  
  const displayTotal = currency === 'AMD' 
    ? `${totalAMD.toLocaleString()} ֏` 
    : `$${totalUSD.toLocaleString()}`;

  const activeWallet = WALLETS.find(w => w.network === selectedNetwork) || WALLETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeWallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
        setError(lang === 'HY' ? 'Հասցեն պարտադիր է:' : 'Shipping address is required.');
        return;
    }
    setError(null);
    setStep('payment');
  };

  const handleFinalizeOrder = async () => {
    setError(null);
    setIsProcessing(true);
    
    // Validation for Crypto
    if (paymentMethod === 'crypto' && !txHash.trim()) {
        setIsProcessing(false);
        setError("Transaction Hash (TX ID) is required to verify your payment.");
        return;
    }

    // Simulate payment verification delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Success Logic
    const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        userId: user ? user.id : 'guest',
        items: items,
        totalAMD: totalAMD,
        status: 'Paid',
        shippingAddress: address,
        date: new Date().toLocaleDateString()
    };
    onComplete(newOrder);
    setIsProcessing(false);
    setSuccess(true);
  };

  if (success) {
      return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md"></div>
            <div className="relative text-center animate-fade-in-up">
                <span className="text-6xl text-mutedGold mb-4 block animate-pulse">✧</span>
                <h2 className="text-3xl font-serif text-white mb-4">Acquisition Complete</h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    {paymentMethod === 'crypto' 
                        ? "Your blockchain transaction has been detected. Our concierge will contact you once confirmations are finalized."
                        : "Thank you. Your legacy piece is being prepared for its journey."}
                </p>
                <button onClick={onClose} className="px-8 py-3 bg-white/10 rounded-full text-white uppercase text-xs hover:bg-white/20 border border-white/5 tracking-widest transition-colors">
                    Return to Gallery
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-xl bg-surface border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden animate-slide-in flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-charcoal">
            <h2 className="font-serif text-xl text-white">
                {step === 'shipping' ? UI_TEXT.checkout_title[lang] : 'Secure Payment'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>

        <div className="overflow-y-auto p-6 md:p-8">
            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 text-red-200 text-xs rounded-lg flex items-center gap-3 animate-fade-in-up">
                    <span className="text-lg">⚠</span>
                    {error}
                </div>
            )}

            {/* Order Summary (Compact) */}
            <div className="mb-8 p-4 bg-black/40 rounded-xl border border-white/5 flex justify-between items-center">
                 <div className="text-gray-400 text-xs uppercase tracking-widest">Total Amount</div>
                 <div className="text-xl font-serif text-mutedGold">{displayTotal}</div>
            </div>

            {step === 'shipping' ? (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs text-mutedGold uppercase tracking-widest mb-2">{UI_TEXT.checkout_address[lang]}</label>
                        <textarea 
                            required
                            autoFocus
                            rows={3}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="input-inset w-full rounded-xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-mutedGold/50 transition-all resize-none placeholder-gray-700"
                            placeholder="Full street address, City, Postal Code, Country"
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full btn-tactile bg-mutedGold text-charcoal py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:text-white transition-all"
                    >
                        Proceed to Payment
                    </button>
                </form>
            ) : (
                <div className="space-y-8">
                    {/* Payment Method Toggle */}
                    <div className="flex bg-charcoal p-1 rounded-xl border border-white/10">
                        <button 
                            onClick={() => setPaymentMethod('card')}
                            className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold rounded-lg transition-all ${paymentMethod === 'card' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Credit Card
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('crypto')}
                            className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold rounded-lg transition-all ${paymentMethod === 'crypto' ? 'bg-mutedGold text-charcoal shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Crypto
                        </button>
                    </div>

                    {paymentMethod === 'card' ? (
                        <div className="animate-fade-in-up">
                            <div className="p-6 border border-green-900/30 bg-green-900/10 rounded-xl flex flex-col items-center gap-4 text-center">
                                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                                <p className="text-xs text-green-400 font-mono">
                                    Secure 256-bit SSL Encrypted Connection established.
                                </p>
                                <div className="flex gap-2 opacity-50">
                                    <div className="w-10 h-6 bg-white/10 rounded"></div>
                                    <div className="w-10 h-6 bg-white/10 rounded"></div>
                                    <div className="w-10 h-6 bg-white/10 rounded"></div>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-2">
                                    (Simulated Gateway for Demo)
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-fade-in-up space-y-6">
                            {/* Network Select */}
                            <div>
                                <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-3">Select Network</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {WALLETS.map(w => (
                                        <button
                                            key={w.network}
                                            onClick={() => setSelectedNetwork(w.network)}
                                            className={`py-3 px-2 text-[10px] font-bold uppercase rounded-lg border transition-all ${
                                                selectedNetwork === w.network 
                                                ? 'bg-mutedGold text-charcoal border-mutedGold' 
                                                : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                                            }`}
                                        >
                                            {w.network}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Wallet Display */}
                            <div className="p-5 bg-charcoal rounded-xl border border-white/10 relative group">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                                    Send exactly <span className="text-white font-bold">${totalUSD.toLocaleString()}</span> worth of {activeWallet.token}
                                </p>
                                <div className="flex items-center justify-between gap-2 bg-black/50 p-3 rounded-lg border border-white/5">
                                    <code className="text-xs text-gray-300 truncate font-mono select-all">
                                        {activeWallet.address}
                                    </code>
                                    <button 
                                        onClick={handleCopy}
                                        className="p-2 hover:bg-white/10 rounded-md transition-colors text-mutedGold"
                                        title="Copy Address"
                                    >
                                        {copied ? (
                                            <span className="text-[10px] font-bold">COPIED</span>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                        )}
                                    </button>
                                </div>
                                <p className="text-[9px] text-gray-600 mt-2 text-center">
                                    Only send {activeWallet.token} to this address. Other tokens may be lost.
                                </p>
                            </div>

                            {/* TX Hash Input */}
                            <div>
                                <label className="block text-[10px] text-mutedGold uppercase tracking-widest mb-2">Transaction Hash (TX ID)</label>
                                <input 
                                    type="text" 
                                    value={txHash}
                                    onChange={(e) => setTxHash(e.target.value)}
                                    placeholder="Paste the transaction ID here to verify"
                                    className="input-inset w-full rounded-xl p-4 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-mutedGold/50 transition-all placeholder-gray-700"
                                />
                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <button 
                            onClick={handleFinalizeOrder}
                            disabled={isProcessing}
                            className="w-full btn-tactile bg-mutedGold text-charcoal py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {isProcessing ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin"></span>
                                    {paymentMethod === 'crypto' ? 'Verifying on Blockchain...' : 'Processing...'}
                                </>
                            ) : (
                                paymentMethod === 'crypto' ? 'Verify & Complete' : UI_TEXT.checkout_complete[lang]
                            )}
                        </button>
                        <button 
                            onClick={() => setStep('shipping')}
                            className="w-full mt-4 text-[10px] text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
                        >
                            ← Back to Shipping
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
