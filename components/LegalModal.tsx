
import React from 'react';
import { LEGAL_TEXT } from '../constants';

interface LegalModalProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const content = LEGAL_TEXT[type];

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-surface border border-white/10 shadow-2xl max-h-[80vh] flex flex-col animate-fade-in-up">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
             <h2 className="font-serif text-2xl text-white">{content.title}</h2>
             <button onClick={onClose} className="text-white hover:text-mutedGold text-xl">✕</button>
        </div>
        <div className="p-8 overflow-y-auto leading-relaxed text-gray-300 text-sm whitespace-pre-line">
            {content.content}
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
