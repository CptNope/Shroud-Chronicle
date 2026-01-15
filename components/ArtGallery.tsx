import React, { useState } from 'react';
import { LensMode } from '../types';
import { Palette, Info, ExternalLink, Frame, MapPin, Calendar, Ticket } from 'lucide-react';

interface ArtGalleryProps {
  lens: LensMode;
}

const ART_PIECES = [
  {
    id: 'pantocrator',
    title: 'Christ Pantocrator (Sinai)',
    date: '6th Century',
    artist: 'Unknown (Encaustic)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Spas_vsederzhitel_sinay.jpg',
    connection: 'The "Vignon Markings" (15+ points of congruence) link this icon directly to the Shroud face, suggesting the Shroud was known in the 6th century.',
    lens: 'BELIEVER'
  },
  {
    id: 'justinian_coin',
    title: 'Justinian II Solidus',
    date: '692 AD',
    artist: 'Byzantine Mint',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Solidus-Justinian_II-Christ_b-sb1413.jpg',
    connection: 'The first coin to depict Christ. The engraving perfectly overlays the Shroud face, including the off-center nose and beard shape.',
    lens: 'BELIEVER'
  },
  {
    id: 'pray_codex',
    title: 'The Pray Codex',
    date: '1192-1195 AD',
    artist: 'Hungarian Manuscript',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Pray_codex_1192-1195.jpg',
    connection: 'Shows Jesus with hands crossed (no thumbs), naked, lying on a herringbone cloth with "L" shaped burn holes matching the Shroud.',
    lens: 'BELIEVER'
  },
  {
    id: 'veronica',
    title: 'Saint Veronica',
    date: 'c. 1470',
    artist: 'Hans Memling',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Hans_Memling_-_Saint_Veronica_-_National_Gallery_of_Art.jpg',
    connection: 'Depicts the "Veil of Veronica". Art historians often conflate the Shroud (Mandylion) and Veronica legends in medieval art.',
    lens: 'NEUTRAL'
  },
  {
    id: 'holbein',
    title: 'The Body of the Dead Christ',
    date: '1521',
    artist: 'Hans Holbein the Younger',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/03/The_Body_of_the_Dead_Christ_in_the_Tomb%2C_and_a_detail_of_his_head._Oil_painting_by_Hans_Holbein_the_Younger%2C_1521.jpg',
    connection: 'A realistic depiction of rigor mortis and putrefaction. Skeptics argue the Shroud is an artwork of similar "Gothic realism" rather than a miracle.',
    lens: 'SKEPTIC'
  },
  {
    id: 'besancon',
    title: 'The Shroud of Besançon',
    date: '17th Century Copy',
    artist: 'Unknown',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Linceul_de_Besan%C3%A7on.jpg',
    connection: 'One of many known "copies" of the Shroud painted during the middle ages. Skeptics argue the Turin Shroud is simply the only surviving one of these copies.',
    lens: 'SKEPTIC'
  }
];

const POSTERS = [
  {
    id: 'expo_1898',
    year: 1898,
    title: 'Ostension of 1898',
    location: 'Turin, Italy',
    description: 'The pivotal exhibition where Secondo Pia took the first photograph, revealing the negative image. This event transformed the Shroud from a relic into a scientific mystery.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Secundo_Pia_Turinske_platno_1898.jpg',
    type: 'HISTORICAL PHOTO'
  },
  {
    id: 'expo_1931',
    year: 1931,
    title: 'Royal Wedding Exhibition',
    location: 'Turin Cathedral',
    description: 'Held to celebrate the marriage of Prince Umberto of Savoy. Giuseppe Enrie took the definitive high-resolution black and white photos used for decades of research.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Turin_face_positive.jpg',
    type: 'OFFICIAL PHOTO'
  },
  {
    id: 'expo_1978',
    year: 1978,
    title: 'The Centennial Ostension',
    location: 'Turin, Italy',
    description: 'Marking 400 years since the transfer to Turin. This exposition was followed immediately by the STURP team\'s 120-hour scientific examination.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2c/STURP_logo.png', 
    type: 'EVENT LOGO'
  },
  {
    id: 'expo_1998',
    year: 1998,
    title: 'Century of Photography',
    location: 'Turin, Italy',
    description: 'Celebrating 100 years since Pia\'s discovery. Pope John Paul II visited, calling the Shroud a "mirror of the Gospel".',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Duomo_Torino.jpg/800px-Duomo_Torino.jpg',
    type: 'LOCATION'
  },
  {
    id: 'expo_2000',
    year: 2000,
    title: 'Great Jubilee Exposition',
    location: 'Turin, Italy',
    description: 'A special exposition for the Millennium Jubilee. The Shroud was displayed in a new inert gas case to prevent decay.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Sindone_2010.jpg',
    type: 'DISPLAY VIEW'
  },
  {
    id: 'expo_2010',
    year: 2010,
    title: 'The Restoration Reveal',
    location: 'Turin, Italy',
    description: 'The first public viewing after the major 2002 restoration where patches were removed and the backing cloth replaced.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Ostensione_Sindone_2010_-_Duomo_di_Torino.jpg/800px-Ostensione_Sindone_2010_-_Duomo_di_Torino.jpg',
    type: 'PUBLIC VIEWING'
  },
  {
    id: 'expo_2015',
    year: 2015,
    title: 'The Love That Saves',
    location: 'Turin, Italy',
    description: 'Pope Francis prayed before the Shroud during this exposition, focusing on the theme of suffering and redemption.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Papa_Francesco_a_Torino_2015.jpg/800px-Papa_Francesco_a_Torino_2015.jpg',
    type: 'PAPAL VISIT'
  }
];

export const ArtGallery: React.FC<ArtGalleryProps> = ({ lens }) => {
  const [activeTab, setActiveTab] = useState<'ART' | 'EXHIBITS'>('ART');

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-in fade-in duration-500">
      
      {/* Header and Tabs */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-2">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <Palette className="text-purple-500" /> 
            Visual Archive
          </h2>
          <p className="text-neutral-400">
            A collection of artistic echoes and historical exhibition imagery.
          </p>
        </div>
        
        <div className="flex gap-2">
           <button 
             onClick={() => setActiveTab('ART')}
             className={`px-4 py-2 rounded-t-lg text-sm font-bold transition-colors ${
               activeTab === 'ART' 
                 ? 'bg-neutral-800 text-white border-b-2 border-purple-500' 
                 : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900'
             }`}
           >
             Inspired Art
           </button>
           <button 
             onClick={() => setActiveTab('EXHIBITS')}
             className={`px-4 py-2 rounded-t-lg text-sm font-bold transition-colors ${
               activeTab === 'EXHIBITS' 
                 ? 'bg-neutral-800 text-white border-b-2 border-amber-500' 
                 : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900'
             }`}
           >
             Exhibitions
           </button>
        </div>
      </div>

      {/* ART GRID */}
      {activeTab === 'ART' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-left-4 duration-300">
          {ART_PIECES.map((art) => {
            const isHighlight = (lens === 'BELIEVER' && art.lens === 'BELIEVER') || 
                                (lens === 'SKEPTIC' && art.lens === 'SKEPTIC');
            
            return (
              <div 
                key={art.id} 
                className={`group relative bg-neutral-900 rounded-xl overflow-hidden border transition-all duration-300 ${
                  isHighlight 
                    ? (lens === 'BELIEVER' ? 'border-amber-900/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'border-cyan-900/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]')
                    : 'border-neutral-800 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={art.url} 
                    alt={art.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight">{art.title}</h3>
                      <p className="text-xs text-neutral-500 font-mono mt-1">{art.artist}, {art.date}</p>
                    </div>
                  </div>
                  
                  <p className={`text-sm mt-3 leading-relaxed ${isHighlight ? 'text-neutral-200' : 'text-neutral-400'}`}>
                    {art.connection}
                  </p>

                  <div className="mt-4 pt-4 border-t border-neutral-800 flex justify-end">
                     <a 
                       href={art.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-xs flex items-center gap-1 text-neutral-500 hover:text-white transition-colors"
                     >
                       View Full Res <ExternalLink size={10} />
                     </a>
                  </div>
                </div>

                {isHighlight && (
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${
                    lens === 'BELIEVER' ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'bg-cyan-500/20 border-cyan-500 text-cyan-500'
                  }`}>
                    {lens === 'BELIEVER' ? 'Evidence Link' : 'Skeptic Link'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* EXHIBITS GRID */}
      {activeTab === 'EXHIBITS' && (
        <div className="animate-in slide-in-from-right-4 duration-300">
           {/* Future Placeholder Banner */}
           <div className="mb-8 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neutral-800 rounded-full text-neutral-400">
                  <Ticket size={20} />
                </div>
                <div>
                   <h4 className="text-sm font-bold text-white">Next Anticipated Jubilee</h4>
                   <p className="text-xs text-neutral-500">Exhibitions are typically granted by papal decree for Holy Years.</p>
                </div>
              </div>
              <div className="text-xl font-black text-neutral-300 tracking-tighter">2025</div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {POSTERS.map((poster) => (
              <div 
                key={poster.id} 
                className={`group bg-neutral-900 rounded-xl overflow-hidden border transition-all duration-300 ${
                  lens === 'BELIEVER' ? 'border-neutral-800 hover:border-amber-900/50' : 'border-neutral-800 hover:border-cyan-900/50'
                }`}
              >
                {/* Image Area */}
                <div className="relative aspect-[2/3] overflow-hidden bg-black">
                  <img 
                    src={poster.imageUrl} 
                    alt={poster.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-2 left-2">
                     <span className="bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 uppercase tracking-wider">
                       {poster.year}
                     </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                     <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">{poster.type}</span>
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-neutral-200 transition-colors">
                    {poster.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                    <MapPin size={12} /> {poster.location}
                  </div>

                  <p className="text-sm text-neutral-400 leading-relaxed border-t border-neutral-800 pt-3">
                    {poster.description}
                  </p>
                </div>
                
                {/* Footer Action */}
                <div className="px-4 py-3 bg-neutral-950/50 border-t border-neutral-800 flex justify-between items-center">
                  <span className="text-[10px] text-neutral-600 font-mono">ID: {poster.id.split('_')[1]}</span>
                  <span className="text-neutral-600"><ExternalLink size={12} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};