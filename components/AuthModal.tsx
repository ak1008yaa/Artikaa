
import React, { useState } from 'react';
import { User, Language } from '../types';
import { UI_TEXT } from '../constants';

interface AuthModalProps {
  onClose: () => void;
  onRegister: (user: User) => void; // We use this for both Login and Register in this demo
  lang: Language;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onRegister, lang }) => {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    // Simulate API Call
    setTimeout(() => {
        const googleUser: User = {
            id: `google-${Date.now()}`,
            name: 'Davood H.', // Simulated Google Name
            email: 'davood.art@gmail.com',
            phone: '',
            joinedAt: new Date().toLocaleDateString()
        };
        onRegister(googleUser);
        onClose();
        setIsGoogleLoading(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate Backend Auth
    setTimeout(() => {
        const newUser: User = {
            id: mode === 'signin' ? 'user-returning' : `user-${Date.now()}`,
            name: mode === 'signin' ? 'Welcome Back' : formData.name, // Mock logic
            email: formData.email,
            phone: formData.phone,
            joinedAt: new Date().toLocaleDateString()
        };
        onRegister(newUser);
        onClose();
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-surface border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-500 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">✕</button>
        
        {/* Header / Brand */}
        <div className="bg-charcoal p-8 pb-4 text-center border-b border-white/5">
            <h2 className="font-serif text-2xl text-white tracking-wide">
                {mode === 'signin' ? UI_TEXT.btn_signin[lang].split('/')[0] : UI_TEXT.form_register[lang]}
            </h2>
            <p className="text-[10px] text-mutedGold uppercase tracking-[0.2em] mt-2">
                {mode === 'signin' ? 'Access your Sanctuary' : 'Begin your collection'}
            </p>
        </div>

        <div className="p-8">
            {/* Google Button */}
            <button 
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading || isLoading}
                className="w-full bg-white text-charcoal py-3 rounded-lg flex items-center justify-center gap-3 font-bold text-sm hover:bg-gray-200 transition-colors mb-6 relative overflow-hidden"
            >
                {isGoogleLoading ? (
                    <div className="flex items-center gap-2">
                         <span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin"></span>
                         <span>Connecting...</span>
                    </div>
                ) : (
                    <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Continue with Google</span>
                    </>
                )}
            </button>

            <div className="relative flex py-2 items-center mb-6">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-[10px] text-gray-500 uppercase tracking-widest">Or via Email</span>
                <div className="flex-grow border-t border-white/10"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                    <div className="space-y-1 animate-fade-in-up">
                        <label className="text-[10px] text-mutedGold uppercase tracking-widest ml-1">{UI_TEXT.form_name[lang]}</label>
                        <input 
                            required
                            type="text" 
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-charcoal/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-mutedGold outline-none transition-colors placeholder-gray-600"
                        />
                    </div>
                )}
                
                <div className="space-y-1">
                    <label className="text-[10px] text-mutedGold uppercase tracking-widest ml-1">{UI_TEXT.form_email[lang]}</label>
                    <input 
                        required
                        type="email" 
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-charcoal/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-mutedGold outline-none transition-colors placeholder-gray-600"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] text-mutedGold uppercase tracking-widest ml-1">Password</label>
                    <input 
                        required
                        type="password" 
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-charcoal/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-mutedGold outline-none transition-colors placeholder-gray-600"
                    />
                </div>

                {mode === 'register' && (
                    <div className="space-y-1 animate-fade-in-up">
                        <label className="text-[10px] text-mutedGold uppercase tracking-widest ml-1">{UI_TEXT.form_phone[lang]} (Optional)</label>
                        <input 
                            type="tel" 
                            placeholder="+1 234 ..."
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full bg-charcoal/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-mutedGold outline-none transition-colors placeholder-gray-600"
                        />
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={isLoading || isGoogleLoading}
                    className="w-full mt-4 btn-tactile bg-mutedGold text-charcoal py-4 rounded-lg font-bold text-xs uppercase tracking-[0.15em] hover:text-white transition-all transform active:scale-95 disabled:opacity-50"
                >
                    {isLoading ? 'Processing...' : (mode === 'signin' ? 'Secure Sign In' : 'Create Account')}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                    {mode === 'signin' ? "Don't have an account? " : "Already have a profile? "}
                    <button 
                        onClick={() => setMode(mode === 'signin' ? 'register' : 'signin')}
                        className="text-mutedGold hover:text-white underline font-medium transition-colors ml-1"
                    >
                        {mode === 'signin' ? 'Join the Circle' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
