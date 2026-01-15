import React from 'react';
import { LensMode } from '../types';
import { Heart, Coffee, Bitcoin, Github, Mail, ExternalLink, QrCode, Copy } from 'lucide-react';

interface DonationsProps {
  lens: LensMode;
}

export const Donations: React.FC<DonationsProps> = ({ lens }) => {
  const isBeliever = lens === 'BELIEVER';
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Address copied to clipboard!');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${isBeliever ? 'bg-amber-500/10 text-amber-500' : 'bg-cyan-500/10 text-cyan-500'}`}>
          <Heart size={32} fill="currentColor" className="opacity-50" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">Support the Chronicle</h1>
        <p className="text-lg text-neutral-400 max-w-xl mx-auto">
          Help maintain this archive of high-resolution imagery, forensic data visualizations, and unbiased historical research.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        
        {/* Option 1: Ko-Fi / Coffee */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 flex flex-col items-center text-center hover:border-neutral-700 transition-colors">
          <div className="w-12 h-12 bg-pink-500/10 text-pink-500 rounded-full flex items-center justify-center mb-4">
            <Coffee size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Buy Us a Coffee</h3>
          <p className="text-sm text-neutral-400 mb-6">
            Small contributions help cover server costs for hosting high-res Shroud imagery and dataset bandwidth.
          </p>
          <button className="mt-auto w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
            Support on Ko-fi <ExternalLink size={16} />
          </button>
        </div>

        {/* Option 2: GitHub Sponsors */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 flex flex-col items-center text-center hover:border-neutral-700 transition-colors">
          <div className="w-12 h-12 bg-neutral-700/30 text-white rounded-full flex items-center justify-center mb-4">
            <Github size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">GitHub Sponsors</h3>
          <p className="text-sm text-neutral-400 mb-6">
            Support the open-source development of the "Dual-Lens" visualization engine and PWA architecture.
          </p>
          <button className="mt-auto w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
            Sponsor Development <ExternalLink size={16} />
          </button>
        </div>

      </div>

      {/* Crypto Section */}
      <div className="bg-neutral-900/50 rounded-xl border border-neutral-800 p-6 mb-12">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Bitcoin className="text-amber-500" /> Crypto Contributions
        </h3>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            <div className="p-2 bg-white rounded">
               <QrCode className="text-black" size={32} />
            </div>
            <div className="flex-1 text-center sm:text-left overflow-hidden w-full">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-1">Bitcoin (BTC)</span>
              <code className="text-xs text-neutral-300 font-mono break-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</code>
            </div>
            <button 
              onClick={() => copyToClipboard('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh')}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              title="Copy Address"
            >
              <Copy size={20} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
            <div className="p-2 bg-white rounded">
               <QrCode className="text-black" size={32} />
            </div>
            <div className="flex-1 text-center sm:text-left overflow-hidden w-full">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-1">Ethereum (ETH)</span>
              <code className="text-xs text-neutral-300 font-mono break-all">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</code>
            </div>
            <button 
              onClick={() => copyToClipboard('0x71C7656EC7ab88b098defB751B7401B5f6d8976F')}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              title="Copy Address"
            >
              <Copy size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Contribute Data */}
      <div className={`rounded-xl p-8 text-center border ${isBeliever ? 'bg-amber-950/20 border-amber-900/50' : 'bg-cyan-950/20 border-cyan-900/50'}`}>
        <h3 className="text-xl font-bold text-white mb-2">Research Contribution?</h3>
        <p className="text-neutral-300 mb-6">
          Do you have high-quality photogrammetry data, translations of obscure medieval manuscripts, or new peer-reviewed findings regarding the Shroud?
        </p>
        <button className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-black transition-colors ${isBeliever ? 'bg-amber-500 hover:bg-amber-400' : 'bg-cyan-500 hover:bg-cyan-400'}`}>
          <Mail size={18} /> Contact the Archivist
        </button>
      </div>

    </div>
  );
};
