import React from 'react';
import { Eye, ShieldAlert, ShieldCheck } from 'lucide-react';
import { LensMode } from '../types';

interface LensToggleProps {
  mode: LensMode;
  setMode: (mode: LensMode) => void;
}

export const LensToggle: React.FC<LensToggleProps> = ({ mode, setMode }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 sticky top-0 z-50 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800">
      <div className="flex items-center space-x-2 mb-2">
        <span className={`text-xs uppercase tracking-widest font-bold ${mode === 'SKEPTIC' ? 'text-cyan-400' : 'text-neutral-500'}`}>Skeptic Lens</span>
        <div 
          className="relative w-16 h-8 bg-neutral-800 rounded-full cursor-pointer border border-neutral-600 shadow-inner"
          onClick={() => setMode(mode === 'SKEPTIC' ? 'BELIEVER' : 'SKEPTIC')}
        >
          <div className={`absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300 transform flex items-center justify-center ${
            mode === 'BELIEVER' 
              ? 'translate-x-8 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]' 
              : 'translate-x-0 bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.6)]'
          }`}>
            {mode === 'BELIEVER' ? <ShieldCheck size={14} className="text-white" /> : <ShieldAlert size={14} className="text-white" />}
          </div>
        </div>
        <span className={`text-xs uppercase tracking-widest font-bold ${mode === 'BELIEVER' ? 'text-amber-400' : 'text-neutral-500'}`}>Authentic Lens</span>
      </div>
      
      <div className={`text-xs font-mono transition-colors duration-300 ${mode === 'BELIEVER' ? 'text-amber-200/70' : 'text-cyan-200/70'}`}>
        {mode === 'BELIEVER' ? 'Visualizing Evidence for 1st Century Origin' : 'Visualizing Evidence for Medieval Artistry'}
      </div>
    </div>
  );
};
