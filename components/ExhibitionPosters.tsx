import React from 'react';
import { LensMode } from '../types';
import { Frame, Calendar, MapPin, ExternalLink, Ticket } from 'lucide-react';

interface ExhibitionPostersProps {
  lens: LensMode;
}

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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2c/STURP_logo.png', // Using STURP logo as representative for 1978 science focus
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Sindone_2010.jpg', // 2010 viewing but representative of modern display
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

export const ExhibitionPosters: React.FC<ExhibitionPostersProps> = ({ lens }) => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-in fade-in duration-500">
      <div className="mb-8 border-b border-neutral-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <Frame className="text-amber-600" /> 
            Exhibition History
          </h2>
          <p className="text-neutral-400">
            A visual timeline of public "Ostensions" (Exhibitions) and the imagery used to promote them.
          </p>
        </div>
        <div className="text-right hidden md:block">
           <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">Next Anticipated</span>
           <span className="text-lg font-bold text-neutral-300">Jubilee 2025</span>
        </div>
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
              <span className="text-[10px] text-neutral-600 font-mono">ARCHIVE ID: {poster.id.toUpperCase()}</span>
              {poster.year === 2025 ? (
                 <span className="text-xs text-amber-500 font-bold flex items-center gap-1"><Ticket size={12} /> Info</span>
              ) : (
                 <span className="text-neutral-600"><ExternalLink size={12} /></span>
              )}
            </div>
          </div>
        ))}
        
        {/* Placeholder for Future */}
        <div className="border border-dashed border-neutral-800 rounded-xl p-6 flex flex-col items-center justify-center text-center text-neutral-600 hover:border-neutral-700 hover:text-neutral-500 transition-colors aspect-[2/3] md:aspect-auto">
          <Calendar size={48} className="mb-4 opacity-20" />
          <h3 className="font-bold mb-1">Future Ostensions</h3>
          <p className="text-xs max-w-[200px]">
            Exhibitions are typically granted by the Pope for special Jubilee years.
          </p>
        </div>
      </div>
    </div>
  );
};