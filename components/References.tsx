import React from 'react';
import { LensMode } from '../types';
import { Library, Link as LinkIcon, ExternalLink, Book, FileText } from 'lucide-react';

interface ReferencesProps {
  lens: LensMode;
}

interface ReferenceCategory {
  title: string;
  color: string;
  items: {
    title: string;
    author?: string;
    year?: string;
    url: string;
    type: 'WEB' | 'PAPER' | 'BOOK';
  }[];
}

const REFERENCES: ReferenceCategory[] = [
  {
    title: 'Primary Scientific Sources',
    color: 'text-blue-400',
    items: [
      {
        title: 'Radiocarbon Dating of the Shroud of Turin',
        author: 'Nature Vol 337',
        year: '1989',
        url: 'https://www.nature.com/articles/337611a0',
        type: 'PAPER'
      },
      {
        title: 'Studies on the Radiocarbon Sample from the Shroud of Turin',
        author: 'Raymond N. Rogers (Thermochimica Acta)',
        year: '2005',
        url: 'https://www.shroud.com/pdfs/rogers2.pdf',
        type: 'PAPER'
      },
      {
        title: 'A Summary of STURP\'s Conclusions',
        author: 'STURP Team',
        year: '1981',
        url: 'https://www.shroud.com/78conclu.htm',
        type: 'WEB'
      },
      {
        title: 'X-ray Dating of a Linen Sample from the Shroud of Turin',
        author: 'De Caro et al. (Heritage)',
        year: '2022',
        url: 'https://www.mdpi.com/2571-9408/5/2/47',
        type: 'PAPER'
      }
    ]
  },
  {
    title: 'Encyclopedic & General',
    color: 'text-neutral-200',
    items: [
      {
        title: 'Wikipedia: Shroud of Turin',
        url: 'https://en.wikipedia.org/wiki/Shroud_of_Turin',
        type: 'WEB'
      },
      {
        title: 'Wikipedia: History of the Shroud of Turin',
        url: 'https://en.wikipedia.org/wiki/History_of_the_Shroud_of_Turin',
        type: 'WEB'
      },
      {
        title: 'Wikipedia: Radiocarbon dating of the Shroud of Turin',
        url: 'https://en.wikipedia.org/wiki/Radiocarbon_dating_of_the_Shroud_of_Turin',
        type: 'WEB'
      },
      {
        title: 'Shroud.com (Barrie Schwortz)',
        author: 'Oldest & Largest Shroud Archive',
        url: 'https://www.shroud.com/',
        type: 'WEB'
      }
    ]
  },
  {
    title: 'Skeptical Resources',
    color: 'text-cyan-500',
    items: [
      {
        title: 'McCrone Research Institute: The Shroud of Turin',
        author: 'Walter McCrone',
        url: 'https://www.mccrone.com/mm/the-shroud-of-turin/',
        type: 'WEB'
      },
      {
        title: 'CICAP (Italian Committee for the Investigation of Claims of the Pseudosciences)',
        url: 'https://www.cicap.org/n/index.php',
        type: 'WEB'
      },
      {
        title: 'The Shroud of Turin: A Critical Summary',
        author: 'Joe Nickell',
        year: '2000',
        url: 'https://skepticalinquirer.org/newsletter/the-shroud-of-turin-a-critical-summary/',
        type: 'PAPER'
      }
    ]
  },
  {
    title: 'Authenticity Resources',
    color: 'text-amber-500',
    items: [
      {
        title: 'The Shroud of Turin Website (Education)',
        url: 'https://shroud.com/education.htm',
        type: 'WEB'
      },
      {
        title: 'Magis Center: Science of the Shroud',
        author: 'Fr. Robert Spitzer',
        url: 'https://www.magiscenter.com/shroud-of-turin-science',
        type: 'WEB'
      },
      {
        title: 'ENEA Report on Excimer Laser Irradiation',
        author: 'Di Lazzaro et al.',
        year: '2010',
        url: 'https://www.enea.it/en/news-enea/news/the-shroud-of-turin-and-the-enea-study',
        type: 'PAPER'
      }
    ]
  }
];

export const References: React.FC<ReferencesProps> = ({ lens }) => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-in fade-in duration-500">
      <div className="mb-10 border-b border-neutral-800 pb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
          <Library className="text-neutral-400" /> 
          References & Further Reading
        </h2>
        <p className="text-neutral-400">
          A curated list of primary sources, scientific papers, and encyclopedic entries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {REFERENCES.map((category) => (
          <div key={category.title} className="bg-neutral-900/50 rounded-xl border border-neutral-800 p-6">
            <h3 className={`font-bold mb-4 flex items-center gap-2 ${category.color}`}>
              {category.title}
            </h3>
            <ul className="space-y-4">
              {category.items.map((item, idx) => (
                <li key={idx} className="group">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors"
                  >
                    <div className="mt-1 text-neutral-500 group-hover:text-neutral-300">
                      {item.type === 'PAPER' ? <FileText size={16} /> : (item.type === 'BOOK' ? <Book size={16} /> : <LinkIcon size={16} />)}
                    </div>
                    <div>
                      <div className="font-medium text-sm flex items-center gap-2">
                        {item.title} 
                        <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      {(item.author || item.year) && (
                        <div className="text-xs text-neutral-500 mt-0.5">
                          {item.author} {item.year && `• ${item.year}`}
                        </div>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};