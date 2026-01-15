import React from 'react';
import { LABS } from '../constants';
import { LensMode } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area, Cell, ReferenceLine } from 'recharts';
import { ExternalLink, Info, AlertTriangle, CheckCircle, Microscope, FlaskConical } from 'lucide-react';

interface ForensicLabsProps {
  lens: LensMode;
}

// --- MOCK DATA ---

const decayData = [
  { year: 1300, c14Level: 92, vanillinContent: 100, label: '1300 AD (Medieval)' },
  { year: 1600, c14Level: 80, vanillinContent: 85, label: '1600 AD' },
  { year: 1988, c14Level: 60, vanillinContent: 60, label: '1988 (Test Date)' },
  { year: 50, c14Level: 10, vanillinContent: 0, label: '50 AD (Est.)' }, 
];

const waxsData = [
  { name: 'Medieval Linen', degradation: 30, type: 'CONTROL' },
  { name: 'Shroud Sample', degradation: 85, type: 'SAMPLE' },
  { name: 'Masada (74 AD)', degradation: 88, type: 'REFERENCE' },
];

const vp8Data = [
  { distance: 0, intensity: 100 },
  { distance: 10, intensity: 75 },
  { distance: 20, intensity: 50 },
  { distance: 30, intensity: 25 },
  { distance: 40, intensity: 0 },
];

const spectrumData = [
  { wavelength: 400, shroud: 20, blood: 15, paint: 40 },
  { wavelength: 450, shroud: 30, blood: 25, paint: 42 },
  { wavelength: 500, shroud: 45, blood: 40, paint: 45 },
  { wavelength: 550, shroud: 55, blood: 50, paint: 50 },
  { wavelength: 600, shroud: 65, blood: 60, paint: 55 },
  { wavelength: 650, shroud: 75, blood: 70, paint: 60 },
  { wavelength: 700, shroud: 80, blood: 85, paint: 65 },
];

const pollenData = [
  { region: 'France/Italy', count: 17, type: 'EUROPE' }, 
  { region: 'Anatolia (Turkey)', count: 13, type: 'NEAR_EAST' }, 
  { region: 'Jerusalem', count: 28, type: 'JUDEA' }, 
];

const fluorescenceData = [
  { type: 'Background Linen', intensity: 45, category: 'NATURAL' },
  { type: 'Fire Scorch (1532)', intensity: 90, category: 'SCORCH' }, 
  { type: 'Body Image', intensity: 10, category: 'IMAGE' }, 
];

// --- INTERPRETATION HELPERS ---

const getInterpretation = (chartId: string, lens: LensMode) => {
  const content = {
    c14: {
      BELIEVER: {
        title: "Chemical Discrepancy Found",
        text: "Ray Rogers (LANL) discovered that the C14 sample area contained vanillin, a compound that decays over time. The main body of the Shroud has 0% vanillin (implying great age), while the C14 sample retained roughly 37%, matching the chemical profile of a medieval repair, not the original cloth.",
        verdict: "Sample Invalid / Chemically Distinct"
      },
      SKEPTIC: {
        title: "Definitive Medieval Date",
        text: "The 1988 Radiocarbon dating was performed by three independent world-class laboratories. All three overlapped on a date range of 1260-1390 AD, which perfectly aligns with the first historical appearance of the Shroud in Lirey, France (1354).",
        verdict: "95% Confidence: Medieval (1260-1390)"
      }
    },
    waxs: {
      BELIEVER: {
        title: "Crystal Structure Match",
        text: "Wide-Angle X-ray Scattering (WAXS) measures the natural aging of cellulose crystals. The Shroud's degradation levels (L%) are incompatible with medieval linen but statistically identical to linen samples from the Siege of Masada (74 AD).",
        verdict: "Matches 1st Century Linen"
      },
      SKEPTIC: {
        title: "Unproven Methodology",
        text: "WAXS is a novel dating method highly sensitive to environmental factors like temperature and humidity. The 'aging' could be accelerated by the 1532 fire or centuries of storage in non-climate-controlled conditions, producing a false 'ancient' reading.",
        verdict: "Environmental Contamination Likely"
      }
    },
    vp8: {
      BELIEVER: {
        title: "Encoded Topography",
        text: "The VP-8 analyzer revealed that image intensity decreases linearly with distance from the body. This 'Distance Map' allows for perfect 3D reconstruction. Paintings and normal photos do not contain this Z-axis information; they appear distorted when processed this way.",
        verdict: "3D Information Encoded"
      },
      SKEPTIC: {
        title: "Bas-Relief Effect",
        text: "While impressive, this 3D effect can be replicated by rubbing a cloth over a bas-relief sculpture or heating a metal statue (scorch). The 'distance' information is simply a measure of contact pressure or heat intensity from a physical model.",
        verdict: "Consistent with Bas-Relief Rubbing"
      }
    },
    spectrum: {
      BELIEVER: {
        title: "Blood, Not Paint",
        text: "Reflectance spectroscopy confirms the 'blood' stains contain hemoglobin, albumin, and bilirubin. The spectra curve (Orange) follows the path of oxidized whole blood, diverging sharply from the spectra of iron oxide or vermilion paint (Red Dotted).",
        verdict: "Biological Blood Verified"
      },
      SKEPTIC: {
        title: "Artist Pigments Found",
        text: "Walter McCrone's polarized light microscopy identified particles of red ochre and vermilion (medieval pigments) in the image areas. He concluded the 'blood' was actually a tempera paint with a collagen binder, explaining the spectral similarities.",
        verdict: "Pigments Identified by McCrone"
      }
    },
    pollen: {
      BELIEVER: {
        title: "Geographic Trail",
        text: "Max Frei identified 58 pollen types. While some are European (expected), a significant number are halophytes unique to the Dead Sea region and Anatolia. This confirms the cloth's historical path: Jerusalem -> Turkey -> France -> Italy.",
        verdict: "Presence in Jerusalem Confirmed"
      },
      SKEPTIC: {
        title: "Contamination Issues",
        text: "Pollen is easily transported by wind and pilgrims. The cloth has been displayed publicly for centuries. Furthermore, Frei's tape lift protocols were criticized for allowing potential cross-contamination from his other forensic cases.",
        verdict: "Likely Environmental Contamination"
      }
    },
    uv: {
      BELIEVER: {
        title: "Not a Scorch",
        text: "Under UV light, scorch marks (like those from the 1532 fire) fluoresce brightly (reddish). The body image does NOT fluoresce (it absorbs UV). This chemically distinguishes the image from thermal burns, debunking the 'hot statue' theory.",
        verdict: "Chemically Distinct from Scorch"
      },
      SKEPTIC: {
        title: "Alternative Chemistry",
        text: "While not a simple heat scorch, other chemical reactions (like the Maillard reaction or acid oxidation of impurities) could create a non-fluorescent image. The lack of fluorescence simply rules out high-temperature burning, not medieval artistry.",
        verdict: "Rules out Hot Scorch Only"
      }
    }
  };
  return content[chartId as keyof typeof content][lens];
};

export const ForensicLabs: React.FC<ForensicLabsProps> = ({ lens }) => {
  const isBeliever = lens === 'BELIEVER';
  
  // Theme Colors
  const primaryColor = isBeliever ? '#f59e0b' : '#22d3ee'; // Amber / Cyan
  const secondaryColor = '#525252'; // Neutral Gray
  const activeBg = isBeliever ? 'bg-amber-950/20' : 'bg-cyan-950/20';
  const activeBorder = isBeliever ? 'border-amber-500/30' : 'border-cyan-500/30';

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-white mb-3 tracking-tight">FORENSIC DATA VAULT</h2>
        <p className={`text-sm font-mono uppercase tracking-widest ${isBeliever ? 'text-amber-500' : 'text-cyan-500'}`}>
          Interpreting Raw Data via {isBeliever ? 'Authenticity' : 'Skeptic'} Protocol
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        
        {/* --- CHART 1: C14 vs VANILLIN --- */}
        <div className={`p-6 rounded-xl border transition-colors duration-500 ${activeBg} ${activeBorder}`}>
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
               <FlaskConical size={20} className={isBeliever ? 'text-amber-500' : 'text-cyan-500'} />
               Radiocarbon vs. Vanillin
             </h3>
             <span className="text-[10px] font-mono text-neutral-400 border border-neutral-700 px-2 py-1 rounded">Rogers 2005</span>
          </div>
          
          <div className="h-64 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={decayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="year" stroke="#666" tick={{fontSize: 10}} />
                <YAxis stroke="#666" tick={{fontSize: 10}} />
                <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #333' }} />
                <Legend />
                {/* Believer highlights Vanillin (Rogers), Skeptic highlights C14 (Oxford) */}
                <Line 
                  type="monotone" 
                  dataKey="vanillinContent" 
                  name="Vanillin % (Rogers)" 
                  stroke={isBeliever ? primaryColor : secondaryColor} 
                  strokeWidth={isBeliever ? 3 : 1} 
                  dot={{r: isBeliever ? 4 : 2}} 
                />
                <Line 
                  type="monotone" 
                  dataKey="c14Level" 
                  name="C14 Age (Oxford)" 
                  stroke={!isBeliever ? primaryColor : secondaryColor} 
                  strokeWidth={!isBeliever ? 3 : 1} 
                  strokeDasharray="5 5" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <DataInterpretation info={getInterpretation('c14', lens)} lens={lens} />
        </div>

        {/* --- CHART 2: WAXS --- */}
        <div className={`p-6 rounded-xl border transition-colors duration-500 ${activeBg} ${activeBorder}`}>
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
               <Microscope size={20} className={isBeliever ? 'text-amber-500' : 'text-cyan-500'} />
               WAXS Crystallinity
             </h3>
             <span className="text-[10px] font-mono text-neutral-400 border border-neutral-700 px-2 py-1 rounded">De Caro 2022</span>
          </div>

          <div className="h-64 w-full mb-6">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waxsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis type="number" stroke="#666" domain={[0, 100]} tick={{fontSize: 10}} />
                <YAxis dataKey="name" type="category" stroke="#999" width={100} tick={{fontSize: 11}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#171717', border: '1px solid #333' }} />
                <Bar dataKey="degradation" name="Degradation %" barSize={20}>
                  {waxsData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      // Highlight Shroud & Masada match for Believers, Highlight Medieval Control for Skeptics
                      fill={isBeliever 
                        ? (entry.type !== 'CONTROL' ? primaryColor : secondaryColor)
                        : (entry.type === 'CONTROL' ? primaryColor : secondaryColor)
                      } 
                    /> 
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <DataInterpretation info={getInterpretation('waxs', lens)} lens={lens} />
        </div>

        {/* --- CHART 3: VP-8 --- */}
        <div className={`p-6 rounded-xl border transition-colors duration-500 ${activeBg} ${activeBorder}`}>
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
               <Microscope size={20} className={isBeliever ? 'text-amber-500' : 'text-cyan-500'} />
               3D Distance (VP-8)
             </h3>
             <span className="text-[10px] font-mono text-neutral-400 border border-neutral-700 px-2 py-1 rounded">STURP 1978</span>
          </div>

          <div className="h-64 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vp8Data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="distance" stroke="#666" tick={{fontSize: 10}} label={{ value: 'Distance from Body (mm)', position: 'insideBottom', offset: -5, fill: '#666', fontSize: 10 }} />
                <YAxis stroke="#666" tick={{fontSize: 10}} label={{ value: 'Image Intensity', angle: -90, position: 'insideLeft', fill: '#666', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #333' }} />
                <Area 
                  type="monotone" 
                  dataKey="intensity" 
                  name="Intensity" 
                  stroke={isBeliever ? primaryColor : secondaryColor} 
                  fill={isBeliever ? primaryColor : secondaryColor} 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <DataInterpretation info={getInterpretation('vp8', lens)} lens={lens} />
        </div>

        {/* --- CHART 4: SPECTROSCOPY --- */}
        <div className={`p-6 rounded-xl border transition-colors duration-500 ${activeBg} ${activeBorder}`}>
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
               <FlaskConical size={20} className={isBeliever ? 'text-amber-500' : 'text-cyan-500'} />
               Spectral Reflectance
             </h3>
             <span className="text-[10px] font-mono text-neutral-400 border border-neutral-700 px-2 py-1 rounded">Heller/Adler 1981</span>
          </div>

          <div className="h-64 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spectrumData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="wavelength" stroke="#666" tick={{fontSize: 10}} />
                <YAxis stroke="#666" tick={{fontSize: 10}} />
                <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #333' }} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="shroud" 
                  name="Shroud Image" 
                  stroke="#fff" 
                  strokeWidth={2} 
                  dot={false} 
                />
                {/* Believer highlights Blood match, Skeptic highlights Paint possibility */}
                <Line 
                  type="monotone" 
                  dataKey="blood" 
                  name="Whole Blood" 
                  stroke={isBeliever ? primaryColor : secondaryColor} 
                  strokeWidth={isBeliever ? 3 : 1} 
                  strokeDasharray="3 3" 
                  dot={false} 
                />
                <Line 
                  type="monotone" 
                  dataKey="paint" 
                  name="Red Ochre Paint" 
                  stroke={!isBeliever ? primaryColor : secondaryColor} 
                  strokeWidth={!isBeliever ? 3 : 1} 
                  strokeDasharray="3 3" 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <DataInterpretation info={getInterpretation('spectrum', lens)} lens={lens} />
        </div>

         {/* --- CHART 5: POLLEN --- */}
         <div className={`p-6 rounded-xl border transition-colors duration-500 ${activeBg} ${activeBorder}`}>
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
               <Microscope size={20} className={isBeliever ? 'text-amber-500' : 'text-cyan-500'} />
               Pollen Distribution
             </h3>
             <span className="text-[10px] font-mono text-neutral-400 border border-neutral-700 px-2 py-1 rounded">Max Frei 1973</span>
          </div>

          <div className="h-64 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pollenData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="region" stroke="#666" tick={{fontSize: 11}} />
                <YAxis stroke="#666" tick={{fontSize: 10}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#171717', border: '1px solid #333' }} />
                <Bar dataKey="count" name="Species Count" barSize={40}>
                   {pollenData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      // Believer highlights Judea/Near East. Skeptic highlights Europe (contamination source)
                      fill={isBeliever 
                        ? (entry.type !== 'EUROPE' ? primaryColor : secondaryColor)
                        : (entry.type === 'EUROPE' ? primaryColor : secondaryColor)
                      } 
                    /> 
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <DataInterpretation info={getInterpretation('pollen', lens)} lens={lens} />
        </div>

        {/* --- CHART 6: UV --- */}
        <div className={`p-6 rounded-xl border transition-colors duration-500 ${activeBg} ${activeBorder}`}>
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
               <FlaskConical size={20} className={isBeliever ? 'text-amber-500' : 'text-cyan-500'} />
               UV Fluorescence
             </h3>
             <span className="text-[10px] font-mono text-neutral-400 border border-neutral-700 px-2 py-1 rounded">STURP 1978</span>
          </div>

          <div className="h-64 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fluorescenceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis type="number" stroke="#666" tick={{fontSize: 10}} />
                <YAxis dataKey="type" type="category" stroke="#999" width={110} tick={{fontSize: 10}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#171717', border: '1px solid #333' }} />
                <Bar dataKey="intensity" name="UV Intensity" barSize={20}>
                   {fluorescenceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      // Believer highlights Image diff from Scorch. Skeptic highlights background vs Scorch.
                      fill={isBeliever 
                        ? (entry.category === 'IMAGE' ? primaryColor : secondaryColor)
                        : (entry.category === 'SCORCH' ? primaryColor : secondaryColor)
                      } 
                    /> 
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <DataInterpretation info={getInterpretation('uv', lens)} lens={lens} />
        </div>

      </div>

      <div className="space-y-6 border-t border-neutral-800 pt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Lab Reference Matrix</h2>
        {LABS.map((lab) => (
          <div 
            key={lab.id} 
            className={`p-6 rounded-lg border flex flex-col md:flex-row gap-4 transition-all duration-300 ${
               lens === lab.lens 
               ? (lens === 'BELIEVER' ? 'bg-amber-950/10 border-amber-900/40' : 'bg-cyan-950/10 border-cyan-900/40')
               : 'bg-neutral-900/30 border-neutral-800 opacity-75'
            }`}
          >
            <div className="md:w-1/4 flex flex-col justify-between">
              <div>
                 <h4 className={`text-lg font-bold ${lens === lab.lens ? (lens === 'BELIEVER' ? 'text-amber-400' : 'text-cyan-400') : 'text-neutral-400'}`}>
                   {lab.name}
                 </h4>
                 <span className="text-xs font-mono text-neutral-500 block mt-1">{lab.year} • {lab.researcher}</span>
              </div>
              
              {lab.url && (
                <a 
                  href={lab.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors border border-neutral-800 rounded px-3 py-2 hover:bg-neutral-800/50 w-fit"
                >
                  <ExternalLink size={12} />
                  View Study
                </a>
              )}
            </div>
            
            <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-500 block mb-1">Methodology</span>
                <p className="text-sm text-neutral-300">{lab.methodology}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-500 block mb-1">Key Findings</span>
                <p className="text-sm text-neutral-300">{lab.findings}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DataInterpretation: React.FC<{info: any, lens: LensMode}> = ({ info, lens }) => (
  <div className={`p-4 rounded-lg border flex flex-col gap-2 ${
    lens === 'BELIEVER' ? 'bg-amber-950/30 border-amber-900/50' : 'bg-cyan-950/30 border-cyan-900/50'
  }`}>
    <div className="flex items-center gap-2 mb-1">
      {lens === 'BELIEVER' ? <CheckCircle size={16} className="text-amber-500" /> : <AlertTriangle size={16} className="text-cyan-500" />}
      <h4 className={`text-sm font-bold ${lens === 'BELIEVER' ? 'text-amber-400' : 'text-cyan-400'}`}>{info.title}</h4>
    </div>
    <p className="text-xs text-neutral-300 leading-relaxed">
      {info.text}
    </p>
    <div className={`text-[10px] font-mono uppercase tracking-widest mt-2 pt-2 border-t ${
      lens === 'BELIEVER' ? 'border-amber-900/50 text-amber-500/70' : 'border-cyan-900/50 text-cyan-500/70'
    }`}>
      Interpretation: {info.verdict}
    </div>
  </div>
);
