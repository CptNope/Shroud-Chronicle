import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, UserX, ExternalLink, XCircle, Search, ArrowRight } from 'lucide-react';
import { VIRAL_CLAIMS } from '../constants';
import { VerdictType, LensMode } from '../types';

interface ViralCheckProps {
  lens: LensMode;
}

const getVerdictIcon = (verdict: VerdictType) => {
  switch (verdict) {
    case 'VERIFIED': return <CheckCircle className="text-green-500" size={24} />;
    case 'DEBUNKED': return <XCircle className="text-red-500" size={24} />;
    case 'PLAUSIBLE': return <HelpCircle className="text-amber-500" size={24} />;
    case 'CONTESTED': return <AlertTriangle className="text-orange-500" size={24} />;
    case 'UNVERIFIED': return <UserX className="text-neutral-500" size={24} />;
    default: return <Search className="text-blue-500" size={24} />;
  }
};

const getVerdictColor = (verdict: VerdictType) => {
  switch (verdict) {
    case 'VERIFIED': return 'text-green-400';
    case 'DEBUNKED': return 'text-red-400';
    case 'PLAUSIBLE': return 'text-amber-400';
    case 'CONTESTED': return 'text-orange-400';
    default: return 'text-neutral-400';
  }
};

const getVerdictBg = (verdict: VerdictType) => {
  switch (verdict) {
    case 'VERIFIED': return 'bg-green-500/10';
    case 'DEBUNKED': return 'bg-red-500/10';
    case 'PLAUSIBLE': return 'bg-amber-500/10';
    case 'CONTESTED': return 'bg-orange-500/10';
    default: return 'bg-neutral-500/10';
  }
};

export const ViralCheck: React.FC<ViralCheckProps> = ({ lens }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClaims = VIRAL_CLAIMS.filter(claim => 
    claim.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    claim.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 border-b border-neutral-800 pb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Fact-Checking Viral Narratives</h2>
        
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-neutral-800 rounded-lg leading-5 bg-neutral-900 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:bg-neutral-900 focus:border-neutral-600 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Search claims, keywords, or origins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-6">
        {filteredClaims.map((claim) => {
          // Dim if the claim's "lens" does not match the active lens
          const isHighlighted = claim.lens === lens;

          return (
            <div 
              key={claim.id} 
              className={`p-6 rounded-lg border transition-all duration-300 ${
                isHighlighted 
                  ? 'bg-neutral-900 border-neutral-700 opacity-100' 
                  : 'bg-neutral-900/40 border-neutral-800 opacity-50 grayscale hover:opacity-100 hover:grayscale-0'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${getVerdictBg(claim.verdict)}`}>
                  {getVerdictIcon(claim.verdict)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                     <div>
                       <h3 className={`text-lg font-bold ${isHighlighted ? 'text-white' : 'text-neutral-400'}`}>{claim.title}</h3>
                       <p className="text-sm text-neutral-500 mt-1 mb-3">Origin: {claim.origin}</p>
                     </div>
                     {claim.url && (
                       <a 
                         href={claim.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="hidden md:flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-300 transition-colors whitespace-nowrap"
                       >
                         Source <ExternalLink size={10} />
                       </a>
                     )}
                  </div>
                  
                  <div className={`p-4 rounded border ${isHighlighted ? 'bg-neutral-950 border-neutral-800' : 'bg-transparent border-neutral-800/50'}`}>
                    <p className={`text-sm leading-relaxed ${isHighlighted ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      <span className={`font-bold ${isHighlighted ? getVerdictColor(claim.verdict) : 'text-neutral-500'}`}>Verdict: {claim.verdictText}.</span> {claim.description}
                    </p>
                  </div>

                  {/* Mobile Link */}
                  {claim.url && (
                    <div className="mt-3 md:hidden">
                       <a 
                         href={claim.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                       >
                         <ExternalLink size={12} /> View Source Material
                       </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredClaims.length === 0 && (
          <div className="text-center py-12 text-neutral-500">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p>No claims found matching "{searchTerm}"</p>
            <button 
              onClick={() => window.open(`https://www.google.com/search?q=Shroud+of+Turin+${searchTerm}`, '_blank')}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-sm transition-colors"
            >
              Google Search for "{searchTerm}" <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
