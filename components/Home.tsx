import React from 'react';
import { LensMode } from '../types';
import { Shield, ShieldAlert, ShieldCheck, Microscope, History, ScanEye, ArrowRight, BookOpen, Palette, Library } from 'lucide-react';

interface HomeProps {
  lens: LensMode;
  setView: (view: 'TIMELINE' | 'LABS' | 'VIRAL' | 'ARTIFACT' | 'HOME' | 'GALLERY' | 'REFS') => void;
}

export const Home: React.FC<HomeProps> = ({ lens, setView }) => {
  const isBeliever = lens === 'BELIEVER';
  const accentColor = isBeliever ? 'text-amber-500' : 'text-cyan-500';
  const borderColor = isBeliever ? 'border-amber-500/30' : 'border-cyan-500/30';
  const bgColor = isBeliever ? 'bg-amber-950/10' : 'bg-cyan-950/10';

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <div className={`relative rounded-2xl p-8 md:p-12 overflow-hidden border ${borderColor} ${bgColor} mb-12`}>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border mb-6 ${isBeliever ? 'bg-amber-500/10 border-amber-500 text-amber-500' : 'bg-cyan-500/10 border-cyan-500 text-cyan-500'}`}>
            {isBeliever ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
            {isBeliever ? 'Authenticity Perspective' : 'Skeptical Inquiry'}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            {isBeliever ? (
              <>The Silent Witness of <br/><span className="text-amber-500">The Resurrection?</span></>
            ) : (
              <>The Masterpiece of <br/><span className="text-cyan-500">Medieval Art?</span></>
            )}
          </h1>

          <div className="text-lg text-neutral-300 leading-relaxed max-w-2xl mb-8 space-y-5">
            <p>
              {isBeliever 
                ? "You are examining the Shroud as a potential Relic of the Resurrection. This lens prioritizes forensic anomalies that defy medieval artistic capabilities: the presence of human blood (Type AB) with high bilirubin, unique 3D distance information encoded in the image intensity, and pollen grains specific to the Jerusalem area."
                : "You are examining the Shroud as a Medieval Masterpiece. This lens prioritizes historical documentation and standard physical dating methods. It aligns with the 1389 d'Arcis Memorandum, which claimed a local artist confessed to creating it, and the 1988 Radiocarbon tests that definitively dated the linen to 1260–1390 AD."}
            </p>
            
            <div className={`pl-4 border-l-2 ${isBeliever ? 'border-amber-500/50' : 'border-cyan-500/50'} bg-black/20 p-4 rounded-r-lg`}>
                <p className="text-sm italic opacity-90">
                    <strong className={`block mb-1 text-xs uppercase tracking-widest ${isBeliever ? 'text-amber-400' : 'text-cyan-400'}`}>The Core Contention</strong>
                    {isBeliever
                     ? "Proponents argue the 1988 Radiocarbon dating was flawed due to sample contamination or invisible reweaving. They contend that no known artistic method—painting, scorching, or rubbing—can replicate the image's superficiality (0.2 microns deep) and photo-negative properties simultaneously."
                     : "Skeptics argue that 'unsolvable' mysteries often have mundane explanations. They propose the image was created via proto-photography, acid pigmentation, or bas-relief rubbing. They maintain that the lack of provenance before 1354 is fatal to the authenticity claim, viewing 'scientific anomalies' as misinterpretations of natural chemical aging."
                    }
                </p>
            </div>
          </div>

          <button 
            onClick={() => setView('TIMELINE')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-black transition-transform hover:scale-105 ${isBeliever ? 'bg-amber-500 hover:bg-amber-400' : 'bg-cyan-500 hover:bg-cyan-400'}`}
          >
            Start the Journey <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* How it Works */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <div className={`w-1 h-8 rounded ${isBeliever ? 'bg-amber-500' : 'bg-cyan-500'}`}></div>
          How This App Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <div className="mb-4 text-neutral-400">
              <Shield size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Toggle the Lens</h3>
            <p className="text-sm text-neutral-400">
              Use the toggle at the top of the screen to switch perspectives. 
              <span className="text-amber-500 font-bold"> Believer</span> mode highlights scientific anomalies. 
              <span className="text-cyan-500 font-bold"> Skeptic</span> mode highlights historical contradictions.
            </p>
          </div>

          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <div className="mb-4 text-neutral-400">
              <ScanEye size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. Analyze the Artifact</h3>
            <p className="text-sm text-neutral-400">
              Visit the <strong>Artifact</strong> tab to inspect the Shroud. Data points on the image change based on your selected lens, offering different interpretations of the same visual features.
            </p>
          </div>

          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <div className="mb-4 text-neutral-400">
              <BookOpen size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Check the Facts</h3>
            <p className="text-sm text-neutral-400">
              The <strong>Viral Claims</strong> section debunks or verifies common internet myths. The <strong>Labs</strong> section visualizes raw data from STURP, C-14, and WAXS studies.
            </p>
          </div>
        </div>
      </div>

      {/* Explore Sections */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Explore the Archives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          
          <button onClick={() => setView('TIMELINE')} className="group flex items-center p-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-all text-left">
            <div className={`p-3 rounded-lg mr-4 ${isBeliever ? 'bg-amber-900/20 text-amber-500' : 'bg-cyan-900/20 text-cyan-500'}`}>
              <History size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold group-hover:text-amber-500 transition-colors">Interactive Timeline</h4>
              <p className="text-xs text-neutral-500 mt-1">From 33 AD to Present Day</p>
            </div>
            <ArrowRight className="ml-auto text-neutral-600 group-hover:text-white transition-colors" size={16} />
          </button>

          <button onClick={() => setView('LABS')} className="group flex items-center p-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-all text-left">
            <div className={`p-3 rounded-lg mr-4 ${isBeliever ? 'bg-amber-900/20 text-amber-500' : 'bg-cyan-900/20 text-cyan-500'}`}>
              <Microscope size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold group-hover:text-amber-500 transition-colors">Forensic Labs</h4>
              <p className="text-xs text-neutral-500 mt-1">Spectroscopy, C-14, & VP-8 Data</p>
            </div>
            <ArrowRight className="ml-auto text-neutral-600 group-hover:text-white transition-colors" size={16} />
          </button>

          <button onClick={() => setView('GALLERY')} className="group flex items-center p-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-all text-left">
            <div className={`p-3 rounded-lg mr-4 ${isBeliever ? 'bg-amber-900/20 text-amber-500' : 'bg-cyan-900/20 text-cyan-500'}`}>
              <Palette size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold group-hover:text-amber-500 transition-colors">Visual Archive</h4>
              <p className="text-xs text-neutral-500 mt-1">Art, Icons & Exhibition Posters</p>
            </div>
            <ArrowRight className="ml-auto text-neutral-600 group-hover:text-white transition-colors" size={16} />
          </button>

          <button onClick={() => setView('REFS')} className="group flex items-center p-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-all text-left">
            <div className={`p-3 rounded-lg mr-4 ${isBeliever ? 'bg-amber-900/20 text-amber-500' : 'bg-cyan-900/20 text-cyan-500'}`}>
              <Library size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold group-hover:text-amber-500 transition-colors">References</h4>
              <p className="text-xs text-neutral-500 mt-1">Wikipedia, Papers & External Links</p>
            </div>
            <ArrowRight className="ml-auto text-neutral-600 group-hover:text-white transition-colors" size={16} />
          </button>

        </div>
      </div>

    </div>
  );
};