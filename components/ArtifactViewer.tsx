import React, { useState, useEffect } from 'react';
import { Layers, Zap, Mountain, Info, X, Loader2, ImageOff, RefreshCw, Link, Settings, Columns, Sparkles, ImageIcon, ChevronDown, Maximize2 } from 'lucide-react';
import { LensMode } from '../types';
import { ARTIFACT_HOTSPOTS } from '../constants';

interface ArtifactViewerProps {
  lens: LensMode;
}

type ViewMode = 'NATURAL' | 'NEGATIVE' | 'TOPOGRAPHY' | 'UV_FILTER';

interface ImagePreset {
  id: string;
  label: string;
  url: string;
  isSideBySide: boolean;
  isSourceNegative: boolean;
  objectFit: 'cover' | 'contain';
}

const PRESETS: ImagePreset[] = [
  {
    id: 'full_comparison',
    label: "Comparison View (Face)",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/23/Turin_shroud_positive_and_negative_displaying_original_color_information_708_x_465_pixels_94_KB.jpg",
    isSideBySide: true,
    isSourceNegative: false,
    objectFit: 'cover'
  },
  {
    id: 'face_pos',
    label: "Face Detail (Positive)",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/75/Turin_face_positive.jpg",
    isSideBySide: false,
    isSourceNegative: false,
    objectFit: 'cover'
  },
  {
    id: 'face_neg',
    label: "Face Detail (Negative)",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Secundo_Pia_Turinske_platno_1898.jpg",
    isSideBySide: false,
    isSourceNegative: true,
    objectFit: 'cover'
  }
];

// Horizontal Mapping: Left (0%) is Frontal Feet, Right (100%) is Dorsal Feet.
// Center (50%) is Head-to-Head.
const FULL_SHROUD_POINTS = [
  { id: 'fs_ventral_feet', x: 5, y: 55, label: 'Frontal Feet', desc: 'The feet on the frontal image are less distinct but show nail wounds.' },
  { id: 'fs_hands', x: 28, y: 55, label: 'Crossed Hands', desc: 'Hands crossed over the groin area. The lack of visible thumbs is consistent with median nerve injury from wrist nailing.' },
  { id: 'fs_lance', x: 35, y: 50, label: 'Side Wound', desc: 'Large bloodstain on the chest (right side, appearing left) matching a Roman lance thrust.' },
  { id: 'fs_face', x: 44, y: 48, label: 'Frontal Face', desc: 'The faint image of the face, showing the "negative" quality that revealed detailed features in 1898.' },

  { id: 'fs_head_gap', x: 50, y: 42, label: 'Head-to-Head Gap', desc: 'The center of the cloth where the two images meet head-to-head.' },

  { id: 'fs_dorsal_shoulders', x: 56, y: 48, label: 'Shoulder Abrasions', desc: 'Marks consistent with carrying a heavy rough object (patibulum) across the shoulders.' },
  { id: 'fs_blood_belt', x: 62, y: 50, label: 'Blood Belt', desc: 'Pool of blood across the lower back, suggesting blood flow from the side wound while the body was supine.' },
  { id: 'fs_scourge', x: 75, y: 52, label: 'Scourge Marks', desc: 'Over 100 dumbbell-shaped marks covering the back and legs, matching the Roman flagrum.' },
  { id: 'fs_feet', x: 94, y: 52, label: 'Dirt on Feet (Dorsal)', desc: 'The soles of the feet (visible on the dorsal image) contain significant amounts of travertine aragonite dust, suggesting the man walked barefoot in the Jerusalem area.' },
  
  { id: 'fs_water', x: 15, y: 30, label: 'Water Stains', desc: 'Diamond-shaped water stains from the 1532 fire extinguishing efforts.' },
  { id: 'fs_burns', x: 80, y: 70, label: '1532 Fire Burns', desc: 'Scorched lines where molten silver burned through the folded cloth.' }
];

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({ lens }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('NATURAL');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  
  // Image State
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESETS[0].id);
  const [imageUrl, setImageUrl] = useState(PRESETS[0].url);
  const [isSideBySide, setIsSideBySide] = useState(PRESETS[0].isSideBySide);
  const [isSourceNegative, setIsSourceNegative] = useState(PRESETS[0].isSourceNegative);
  const [imgObjectFit, setImgObjectFit] = useState<'cover' | 'contain'>(PRESETS[0].objectFit);
  
  const [imageStatus, setImageStatus] = useState<'LOADING' | 'LOADED' | 'ERROR'>('LOADING');
  const [showSettings, setShowSettings] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');

  const handlePresetChange = (id: string) => {
    const preset = PRESETS.find(p => p.id === id);
    if (preset) {
      setSelectedPresetId(id);
      setImageUrl(preset.url);
      setIsSideBySide(preset.isSideBySide);
      setIsSourceNegative(preset.isSourceNegative);
      setImgObjectFit(preset.objectFit);
      setImageStatus('LOADING');
      setActiveHotspot(null); // Clear hotspot as it might not align
    }
  };

  const handleImageLoad = () => {
    setImageStatus('LOADED');
  };

  const handleImageError = () => {
    setImageStatus('ERROR');
  };

  const handleManualRetry = () => {
    handlePresetChange(PRESETS[0].id);
  };

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrlInput) {
      setImageUrl(customUrlInput);
      setImageStatus('LOADING');
      setIsSideBySide(false); 
      setImgObjectFit('contain');
      setSelectedPresetId('custom');
      setShowSettings(false);
    }
  };

  // Dynamic Styles Calculation for Main Viewer
  const getImageStyle = () => {
    const transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), filter 0.6s ease-in-out';
    
    if (isSideBySide) {
      // Logic for Side-by-Side (Left=Pos, Right=Neg)
      const showRightSide = viewMode === 'NEGATIVE' || viewMode === 'TOPOGRAPHY';
      const transform = showRightSide ? 'translateX(-50%)' : 'translateX(0)';
      
      let filter = '';
      if (viewMode === 'TOPOGRAPHY') {
        filter = 'grayscale(1) brightness(0.9) contrast(2) sepia(1) saturate(5) hue-rotate(180deg)';
      } else if (viewMode === 'NEGATIVE') {
        filter = 'contrast(1.1) brightness(1.1)';
      } else if (viewMode === 'UV_FILTER') {
        filter = 'hue-rotate(190deg) saturate(2.5) contrast(1.4) brightness(1.1)';
      } else {
        filter = 'sepia(0.3) contrast(1.1)';
      }

      return { 
        width: '200%', 
        maxWidth: 'none', 
        height: '100%',
        objectFit: 'cover' as const,
        transform,
        filter,
        transition 
      };

    } else {
      // Logic for Single Image
      let filter = '';
      switch (viewMode) {
        case 'NATURAL':
          if (isSourceNegative) filter = 'invert(1) sepia(0.8) contrast(1.1) brightness(0.9)';
          else filter = 'sepia(0.8) contrast(1.1) brightness(0.9)';
          break;
        case 'NEGATIVE':
          if (isSourceNegative) filter = 'contrast(1.2) brightness(1.1)'; 
          else filter = 'invert(1) contrast(1.3) brightness(1.1) grayscale(1)';
          break;
        case 'TOPOGRAPHY':
          const baseTopo = 'contrast(2) sepia(1) saturate(5) hue-rotate(180deg)';
          if (isSourceNegative) filter = `grayscale(1) brightness(0.9) ${baseTopo}`;
          else filter = `grayscale(1) invert(1) brightness(0.8) ${baseTopo}`;
          break;
        case 'UV_FILTER':
           const baseUV = 'hue-rotate(190deg) saturate(2.5) contrast(1.4) brightness(1.1)';
           if (isSourceNegative) filter = `invert(1) ${baseUV}`; 
           else filter = baseUV;
           break;
      }

      return { 
        width: '100%', 
        height: '100%',
        objectFit: imgObjectFit,
        filter,
        transition 
      };
    }
  };

  // Helper for Full Shroud Styles (Always Positive Source)
  const getFullShroudStyle = () => {
    const transition = 'filter 0.6s ease-in-out';
    let filter = '';
    
    switch (viewMode) {
      case 'NATURAL': 
        filter = 'sepia(0.2) contrast(1.1)'; 
        break;
      case 'NEGATIVE': 
        // Full shroud source is positive, so we invert it for negative view
        filter = 'invert(1) contrast(1.2) brightness(1.1) grayscale(1)'; 
        break;
      case 'TOPOGRAPHY': 
        filter = 'grayscale(1) invert(1) brightness(0.8) contrast(2) sepia(1) saturate(5) hue-rotate(180deg)'; 
        break;
      case 'UV_FILTER': 
        filter = 'hue-rotate(190deg) saturate(2.5) contrast(1.4) brightness(1.1)'; 
        break;
    }
    return { filter, transition };
  };

  const getModeDescription = () => {
    switch (viewMode) {
      case 'NATURAL': return "Visual appearance of the cloth as seen by the naked eye. The image is faint, sepia-colored, and lacks defined boundaries.";
      case 'NEGATIVE': return "The 1898 discovery. When inverted, the faint stains resolve into a realistic, anatomically correct human face with shading.";
      case 'TOPOGRAPHY': return "Simulated VP-8 relief map. Luminance correlates to distance, creating a 3D effect that paintings typically do not possess.";
      case 'UV_FILTER': return "Simulated UV Fluorescence. Under ultraviolet light, the body image absorbs UV and does not fluoresce (unlike scorches or blood serum), helping distinguish the image source.";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-neutral-800 pb-4 gap-4">
         <h2 className="text-2xl font-bold text-white">Forensic Image Analysis</h2>
         
         <div className="flex gap-2">
           <button 
             onClick={() => setShowSettings(!showSettings)}
             className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono border rounded transition-colors ${showSettings ? 'bg-neutral-800 border-neutral-600 text-white' : 'text-neutral-400 border-neutral-800 hover:bg-neutral-800'}`}
             title="Image Settings"
           >
             <Settings size={12} />
             SOURCE
           </button>
         </div>
       </div>

       {/* Manual Override Settings Panel */}
       {showSettings && (
         <div className="mb-6 bg-neutral-900 p-4 rounded-lg border border-neutral-800 animate-in slide-in-from-top-2">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preset Selection */}
              <div>
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <ImageIcon size={14} /> Select Source Image
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetChange(preset.id)}
                      className={`flex items-center justify-between px-3 py-2 text-xs rounded border transition-all ${
                        selectedPresetId === preset.id 
                          ? 'bg-neutral-800 border-neutral-500 text-white' 
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {preset.label}
                      {selectedPresetId === preset.id && <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom URL */}
              <div>
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Link size={14} /> Custom Image URL
                </h3>
                <form onSubmit={handleCustomUrlSubmit} className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Paste image URL here..."
                      value={customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      className="flex-1 bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600"
                    />
                    <button type="submit" className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs rounded font-medium">
                      LOAD
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <label className={`flex items-center gap-2 text-xs cursor-pointer select-none px-3 py-2 rounded border transition-colors ${isSideBySide ? 'bg-neutral-800 border-neutral-600 text-white' : 'border-neutral-800 text-neutral-500'}`}>
                      <input 
                        type="checkbox" 
                        checked={isSideBySide} 
                        onChange={(e) => setIsSideBySide(e.target.checked)}
                        className="hidden"
                      />
                      <Columns size={14} />
                      Split Source
                    </label>

                    {!isSideBySide && (
                      <label className="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={isSourceNegative} 
                          onChange={(e) => setIsSourceNegative(e.target.checked)}
                          className="rounded border-neutral-700 bg-neutral-900 focus:ring-0 focus:ring-offset-0 text-amber-500"
                        />
                        Negative Source
                      </label>
                    )}
                  </div>
                </form>
              </div>
            </div>
         </div>
       )}
       
       <div className="flex flex-col lg:flex-row gap-8">
         
         {/* Main Viewer Area */}
         <div className="lg:w-2/3">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button 
                onClick={() => setViewMode('NATURAL')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'NATURAL' ? 'bg-neutral-200 text-black' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}`}
              >
                <Layers size={16} /> Natural
              </button>
              <button 
                onClick={() => setViewMode('NEGATIVE')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'NEGATIVE' ? 'bg-cyan-500 text-black' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}`}
              >
                <Zap size={16} /> Negative Filter
              </button>
              <button 
                onClick={() => setViewMode('TOPOGRAPHY')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'TOPOGRAPHY' ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}`}
              >
                <Mountain size={16} /> 3D Map
              </button>
              <button 
                onClick={() => setViewMode('UV_FILTER')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'UV_FILTER' ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}`}
              >
                <Sparkles size={16} /> UV Filter
              </button>
            </div>

            {/* Image Container */}
            <div className="relative aspect-[3/4] w-full bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl group flex items-center justify-center">
              
              {/* Loading State */}
              {imageStatus === 'LOADING' && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 z-20">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin text-neutral-500" size={32} />
                    <span className="text-xs font-mono text-neutral-500">Retrieving Artifact...</span>
                  </div>
                </div>
              )}

              {/* Error Overlay */}
              {imageStatus === 'ERROR' && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-950 z-0">
                   <div className="flex flex-col items-center gap-3 text-center p-6">
                    <ImageOff className="text-red-900" size={48} />
                    <span className="text-sm font-bold text-neutral-500">Image Load Failed</span>
                    <button 
                      onClick={handleManualRetry}
                      className="mt-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-xs text-white transition-colors flex items-center gap-2"
                    >
                      <RefreshCw size={12} /> Retry Default
                    </button>
                  </div>
                </div>
              )}

              {/* The Image (Inner container required for masking side-by-side) */}
              <div className="relative w-full h-full overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt="Shroud of Turin Analysis View" 
                  className={`relative z-10 ${imageStatus === 'LOADED' ? 'opacity-100' : 'opacity-0'}`}
                  style={getImageStyle()}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>

              {/* Hotspots Overlay - ALWAYS RENDERED (z-30) */}
              {/* Only render hotspots if we are on the default image or a known safe layout, otherwise coordinates might be wrong */}
              {(selectedPresetId === PRESETS[0].id) && ARTIFACT_HOTSPOTS.map((spot) => {
                const isRelevant = spot.lens === lens || spot.lens === 'NEUTRAL';
                
                return (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot.id)}
                    className={`absolute w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-125 focus:outline-none z-30
                      ${activeHotspot === spot.id 
                        ? 'bg-white border-white scale-125' 
                        : (isRelevant 
                            ? (lens === 'BELIEVER' ? 'bg-amber-500/50 border-amber-400 animate-pulse' : 'bg-cyan-500/50 border-cyan-400 animate-pulse') 
                            : 'bg-neutral-500/30 border-neutral-500')
                      }`}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </button>
                );
              })}
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent z-20 pointer-events-none">
                <p className="text-sm font-mono text-neutral-300 text-center">{getModeDescription()}</p>
              </div>
            </div>
         </div>

         {/* Sidebar / Info Panel */}
         <div className="lg:w-1/3 space-y-6">
            <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800">
               <h3 className="text-xl font-bold text-neutral-200 mb-4 flex items-center gap-2">
                 <Info size={20} />
                 Analysis Details
               </h3>
               
               {activeHotspot ? (
                 <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                   {(() => {
                     const spot = ARTIFACT_HOTSPOTS.find(s => s.id === activeHotspot);
                     return spot ? (
                       <>
                         <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-white">{spot.label}</h4>
                            <button onClick={() => setActiveHotspot(null)} className="text-neutral-500 hover:text-white"><X size={16} /></button>
                         </div>
                         <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                           spot.lens === 'BELIEVER' ? 'text-amber-500' : (spot.lens === 'SKEPTIC' ? 'text-cyan-500' : 'text-neutral-500')
                         }`}>
                           Perspective: {spot.lens}
                         </div>
                         <p className="text-neutral-300 leading-relaxed">{spot.description}</p>
                       </>
                     ) : null;
                   })()}
                 </div>
               ) : (
                 <div className="text-neutral-500 text-sm text-center py-8">
                   {selectedPresetId !== PRESETS[0].id ? (
                      <div className="mb-4 flex flex-col items-center opacity-50">
                        <ImageIcon size={32} />
                        <span className="mt-2 text-xs">Hotspots disabled for this view.</span>
                        <span className="text-[10px]">Switch to "Comparison" view to see forensic points.</span>
                      </div>
                   ) : (
                    <>
                      <div className="mb-4 flex justify-center opacity-20"><Info size={48} /></div>
                      Select a hotspot on the image to view forensic details.
                    </>
                   )}
                 </div>
               )}
            </div>

            <div className={`p-6 rounded-xl border transition-all duration-500 ${lens === 'BELIEVER' ? 'bg-amber-950/10 border-amber-900/30' : 'bg-cyan-950/10 border-cyan-900/30'}`}>
               <h4 className={`font-bold mb-2 ${lens === 'BELIEVER' ? 'text-amber-400' : 'text-cyan-400'}`}>
                 Current Lens: {lens}
               </h4>
               <p className="text-sm text-neutral-400">
                 {lens === 'BELIEVER' 
                   ? "You are viewing the image looking for signs of 1st-century authenticity, trauma consistent with Roman crucifixion, and inexplicable formation characteristics."
                   : "You are viewing the image looking for signs of medieval artistic techniques, proportional errors, iconography consistent with Gothic art, and potential method of fabrication."}
               </p>
            </div>
         </div>
       </div>

       {/* Full Artifact Context Section */}
       <div className="mt-16 border-t border-neutral-800 pt-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Maximize2 size={20} /> Full Artifact Context
            </h3>
            <div className="text-xs font-mono text-neutral-500">
               Filter: <span className={`${viewMode !== 'NATURAL' ? 'text-amber-500 font-bold' : 'text-neutral-300'}`}>{viewMode}</span>
            </div>
          </div>

          <div className="relative w-full bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl group">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Shroudofturin.jpg" 
              alt="Full Shroud of Turin (Pre-2002 Restoration)"
              className="w-full h-auto"
              style={getFullShroudStyle()}
            />
            {FULL_SHROUD_POINTS.map(p => (
              <div key={p.id} className="absolute group/point z-20" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                 <div className="w-5 h-5 -ml-2.5 -mt-2.5 bg-amber-500 border-2 border-white/80 rounded-full cursor-pointer shadow-[0_0_10px_rgba(0,0,0,0.8)] hover:scale-125 hover:bg-white hover:border-amber-500 transition-all duration-200"></div>
                 
                 {/* Hover Tooltip */}
                 <div className={`absolute w-52 bg-black/95 text-xs text-neutral-300 p-3 rounded border border-neutral-700 opacity-0 group-hover/point:opacity-100 pointer-events-none transition-opacity z-50 shadow-2xl
                   ${p.y > 60 ? 'bottom-6' : 'top-6'} 
                   ${p.x > 80 ? 'right-0' : (p.x < 20 ? 'left-0' : 'left-1/2 -translate-x-1/2')}
                 `}>
                   <strong className="block text-white mb-1 font-mono text-[10px] uppercase tracking-wider border-b border-neutral-800 pb-1">{p.label}</strong>
                   {p.desc}
                 </div>
              </div>
            ))}
            
            <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-[10px] font-mono text-neutral-400 backdrop-blur-sm border border-neutral-800 z-30">
              Pre-2002 Restoration
            </div>
          </div>
          <p className="text-center text-neutral-500 text-xs mt-4 font-mono">
            The full cloth displays the ventral (left) and dorsal (right) images head-to-head. Active filter applied from main controls.
          </p>
       </div>

    </div>
  );
};