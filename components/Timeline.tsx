import React from 'react';
import { EVENTS, STURP_PAPERS } from '../constants';
import { LensMode, TimelineEvent } from '../types';
import { Microscope, Scroll, Flame, Camera, Radio, ExternalLink, FileText } from 'lucide-react';

interface TimelineProps {
  lens: LensMode;
}

const getIcon = (category: string) => {
  switch (category) {
    case 'SCIENCE': return <Microscope size={16} />;
    case 'HISTORY': return <Scroll size={16} />;
    case 'THEOLOGY': return <Flame size={16} />;
    default: return <Radio size={16} />;
  }
};

export const Timeline: React.FC<TimelineProps> = ({ lens }) => {
  // Filter or Dim logic based on lens could happen here, 
  // but the design doc says we show both but highlight/dim based on lens.
  
  const isHighlighted = (event: TimelineEvent) => {
    if (event.consensus === 'NEUTRAL') return true;
    if (lens === 'SKEPTIC' && event.consensus === 'SKEPTIC_FAVORED') return true;
    if (lens === 'BELIEVER' && event.consensus === 'AUTHENTIC_FAVORED') return true;
    return false;
  };

  return (
    <div className="relative container mx-auto px-4 py-12 max-w-4xl">
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-800 transform md:-translate-x-1/2"></div>

      <div className="space-y-12">
        {EVENTS.map((event, index) => {
          const active = isHighlighted(event);
          const isRight = index % 2 === 0;
          
          return (
            <div key={event.id} className={`relative flex flex-col md:flex-row ${isRight ? 'md:flex-row-reverse' : ''} items-center w-full group`}>
              
              {/* Timeline Dot */}
              <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 transition-colors duration-500 ${
                active 
                  ? (lens === 'BELIEVER' ? 'bg-amber-500 border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-cyan-500 border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]')
                  : 'bg-neutral-800 border-neutral-600'
              }`}></div>

              {/* Date Marker (Mobile: Right of dot, Desktop: Opposite side of content) */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isRight ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} mb-2 md:mb-0`}>
                 <span className={`font-mono text-sm tracking-widest ${active ? (lens === 'BELIEVER' ? 'text-amber-400' : 'text-cyan-400') : 'text-neutral-600'}`}>
                   {event.displayDate}
                 </span>
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isRight ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className={`p-5 rounded-lg border backdrop-blur-sm transition-all duration-500 ${
                  active 
                    ? (lens === 'BELIEVER' 
                        ? 'bg-amber-950/20 border-amber-900/50 hover:border-amber-500/50' 
                        : 'bg-cyan-950/20 border-cyan-900/50 hover:border-cyan-500/50')
                    : 'bg-neutral-900/50 border-neutral-800 opacity-60 grayscale'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold text-lg ${active ? 'text-neutral-100' : 'text-neutral-500'}`}>{event.title}</h3>
                    <div className="flex gap-2">
                      {event.url && (
                        <a 
                          href={event.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`${active ? (lens === 'BELIEVER' ? 'text-amber-500 hover:text-amber-300' : 'text-cyan-500 hover:text-cyan-300') : 'text-neutral-600 hover:text-neutral-400'} transition-colors`}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <div className={`${active ? (lens === 'BELIEVER' ? 'text-amber-500' : 'text-cyan-500') : 'text-neutral-600'}`}>
                        {getIcon(event.category)}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-neutral-400 mb-3 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Contextual Badges based on Lens */}
                  {lens === 'BELIEVER' && event.consensus === 'SKEPTIC_FAVORED' && (
                    <div className="inline-block px-2 py-1 bg-red-900/30 border border-red-800 rounded text-xs text-red-400 font-mono">
                      ⚠ Contested by Rogers et al.
                    </div>
                  )}

                  {lens === 'SKEPTIC' && event.consensus === 'AUTHENTIC_FAVORED' && event.category === 'THEOLOGY' && (
                    <div className="inline-block px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs text-neutral-500 font-mono">
                      Unverified Assertion
                    </div>
                  )}
                  
                  {active && event.details && (
                    <div className={`mt-3 pt-3 border-t text-xs italic ${lens === 'BELIEVER' ? 'border-amber-900/30 text-amber-200/60' : 'border-cyan-900/30 text-cyan-200/60'}`}>
                      "{event.details}"
                    </div>
                  )}

                  {event.labId && (
                     <div className="mt-3 flex justify-end">
                       <span className="text-[10px] uppercase tracking-wider text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded-full">
                         Lab ID: {event.labId}
                       </span>
                     </div>
                  )}

                  {event.paperRefs && event.paperRefs.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-neutral-800">
                      <div className="flex items-center gap-1 mb-2">
                        <FileText size={12} className="text-neutral-500" />
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500">STURP Papers</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {event.paperRefs.map(id => {
                          const paper = STURP_PAPERS.find(p => p.id === id);
                          if (!paper) return null;
                          const url = paper.pdfUrl || paper.abstractUrl;
                          return url ? (
                            <a
                              key={id}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${lens === 'BELIEVER' ? 'border-amber-900/50 text-amber-400/70 hover:bg-amber-900/20' : 'border-cyan-900/50 text-cyan-400/70 hover:bg-cyan-900/20'}`}
                              title={paper.title}
                            >
                              #{id}
                            </a>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
