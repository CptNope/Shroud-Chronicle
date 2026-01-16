import React, { useState } from 'react';
import { LensToggle } from './components/LensToggle';
import { Timeline } from './components/Timeline';
import { ForensicLabs } from './components/ForensicLabs';
import { ViralCheck } from './components/ViralCheck';
import { ArtifactViewer } from './components/ArtifactViewer';
import { Home } from './components/Home';
import { ArtGallery } from './components/ArtGallery';
import { References } from './components/References';
import { Donations } from './components/Donations';
import { Legal } from './components/Legal';
import { UpdateNotification } from './components/UpdateNotification';
import { InstallPrompt } from './components/InstallPrompt';
import { LensMode } from './types';
import { APP_VERSION } from './constants';
import { Activity, BookOpen, Fingerprint, ScanEye, Home as HomeIcon, Palette, Library, Heart, Scale } from 'lucide-react';

const App = () => {
  const [mode, setMode] = useState<LensMode>('SKEPTIC');
  const [view, setView] = useState<'HOME' | 'TIMELINE' | 'LABS' | 'VIRAL' | 'ARTIFACT' | 'GALLERY' | 'REFS' | 'DONATE' | 'LEGAL'>('HOME');

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-neutral-700 font-sans">
      
      {/* Service Worker Update Prompt */}
      <UpdateNotification />
      
      {/* PWA Install Prompt (Android/Desktop) */}
      <InstallPrompt />

      {/* Sticky Header with Lens Toggle */}
      <LensToggle mode={mode} setMode={setMode} />

      {/* Main Navigation */}
      <div className="container mx-auto px-4 mt-8 max-w-6xl">
        <div className="flex flex-wrap justify-center gap-1 bg-neutral-900/50 p-1 rounded-xl border border-neutral-800 backdrop-blur-sm">
          <button 
            onClick={() => setView('HOME')}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'HOME' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            <HomeIcon size={16} /> <span className="hidden lg:inline">Home</span>
          </button>
          <button 
            onClick={() => setView('TIMELINE')}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'TIMELINE' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            <Activity size={16} /> <span className="hidden lg:inline">Timeline</span>
          </button>
          <button 
            onClick={() => setView('LABS')}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'LABS' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            <Fingerprint size={16} /> <span className="hidden lg:inline">Labs</span>
          </button>
          <button 
            onClick={() => setView('ARTIFACT')}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'ARTIFACT' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            <ScanEye size={16} /> <span className="hidden lg:inline">Artifact</span>
          </button>
          <button 
            onClick={() => setView('VIRAL')}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'VIRAL' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            <BookOpen size={16} /> <span className="hidden lg:inline">Claims</span>
          </button>
          <button 
            onClick={() => setView('GALLERY')}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'GALLERY' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            <Palette size={16} /> <span className="hidden lg:inline">Gallery</span>
          </button>
          <button 
            onClick={() => setView('REFS')}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'REFS' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            <Library size={16} /> <span className="hidden lg:inline">Refs</span>
          </button>
          <button 
            onClick={() => setView('DONATE')}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all ml-2 ${view === 'DONATE' ? 'bg-red-900/30 text-red-400 border border-red-900/50' : 'text-neutral-500 hover:text-red-400 hover:bg-red-950/30'}`}
            title="Support Project"
          >
            <Heart size={16} className={view === 'DONATE' ? 'fill-current' : ''} /> <span className="hidden lg:inline">Support</span>
          </button>
        </div>
      </div>

      {/* Hero Section Content - Only show on Non-Home pages */}
      {view !== 'HOME' && view !== 'DONATE' && view !== 'LEGAL' && (
        <div className="text-center py-10 px-4 animate-in fade-in slide-in-from-bottom-2">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 text-white">SHROUD CHRONICLE</h1>
          <p className={`text-xs md:text-sm tracking-[0.2em] uppercase font-bold ${mode === 'BELIEVER' ? 'text-amber-500' : 'text-cyan-500'}`}>
            {mode === 'BELIEVER' ? 'Evidence for Authenticity' : 'Evidence for Medieval Artistry'}
          </p>
        </div>
      )}

      {/* Dynamic Content */}
      <main className="pb-24">
        {view === 'HOME' && <Home lens={mode} setView={setView} />}
        {view === 'TIMELINE' && <Timeline lens={mode} />}
        {view === 'LABS' && <ForensicLabs lens={mode} />}
        {view === 'ARTIFACT' && <ArtifactViewer lens={mode} />}
        {view === 'VIRAL' && <ViralCheck lens={mode} />}
        {view === 'GALLERY' && <ArtGallery lens={mode} />}
        {view === 'REFS' && <References lens={mode} />}
        {view === 'DONATE' && <Donations lens={mode} />}
        {view === 'LEGAL' && <Legal onClose={() => setView('HOME')} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-8 text-center text-neutral-600 text-xs">
        <p>ShroudChronicle PWA v{APP_VERSION} • Offline-First Design</p>
        <p className="mt-2 opacity-50">Based on Technical Design Document v1.0</p>
        
        {/* Legal Links */}
        <nav className="mt-4 flex flex-wrap justify-center gap-4" aria-label="Legal">
          <button 
            onClick={() => setView('LEGAL')} 
            className="hover:text-neutral-400 transition-colors focus:outline-none focus:underline"
          >
            Terms of Service
          </button>
          <span aria-hidden="true">•</span>
          <button 
            onClick={() => setView('LEGAL')} 
            className="hover:text-neutral-400 transition-colors focus:outline-none focus:underline"
          >
            Privacy Policy
          </button>
          <span aria-hidden="true">•</span>
          <button 
            onClick={() => setView('LEGAL')} 
            className="hover:text-neutral-400 transition-colors focus:outline-none focus:underline"
          >
            Copyright & Fair Use
          </button>
          <span aria-hidden="true">•</span>
          <button 
            onClick={() => setView('LEGAL')} 
            className="hover:text-neutral-400 transition-colors focus:outline-none focus:underline"
          >
            Accessibility
          </button>
        </nav>

        <button onClick={() => setView('DONATE')} className="mt-4 hover:text-neutral-400 transition-colors block mx-auto">
          Contribute to the Archive
        </button>
      </footer>
    </div>
  );
};

export default App;