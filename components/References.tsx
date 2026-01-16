import React, { useState } from 'react';
import { LensMode, STURPPaper } from '../types';
import { Library, Link as LinkIcon, ExternalLink, Book, FileText, ChevronDown, ChevronUp, Download, ClipboardCheck, XCircle, HelpCircle, CheckCircle2 } from 'lucide-react';
import { STURP_PAPERS, STURP_CONCLUSIONS } from '../constants';

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

      {/* STURP Conclusions Section */}
      <div className="mt-12 border-t border-neutral-800 pt-8">
        <STURPConclusionsSection />
      </div>

      {/* STURP Papers Section */}
      <div className="mt-12 border-t border-neutral-800 pt-8">
        <STURPPapersSection />
      </div>
    </div>
  );
};

// STURP Conclusions Component
const STURPConclusionsSection: React.FC = () => {
  const [showFullText, setShowFullText] = useState(false);

  const getCategoryIcon = (category: 'NEGATIVE' | 'POSITIVE' | 'MYSTERY') => {
    switch (category) {
      case 'NEGATIVE':
        return <XCircle size={14} className="text-red-400" />;
      case 'POSITIVE':
        return <CheckCircle2 size={14} className="text-green-400" />;
      case 'MYSTERY':
        return <HelpCircle size={14} className="text-amber-400" />;
    }
  };

  const getCategoryColor = (category: 'NEGATIVE' | 'POSITIVE' | 'MYSTERY') => {
    switch (category) {
      case 'NEGATIVE':
        return 'border-l-red-500/50 bg-red-500/5';
      case 'POSITIVE':
        return 'border-l-green-500/50 bg-green-500/5';
      case 'MYSTERY':
        return 'border-l-amber-500/50 bg-amber-500/5';
    }
  };

  const negativeFindings = STURP_CONCLUSIONS.keyFindings.filter(f => f.category === 'NEGATIVE');
  const positiveFindings = STURP_CONCLUSIONS.keyFindings.filter(f => f.category === 'POSITIVE');
  const mysteryFindings = STURP_CONCLUSIONS.keyFindings.filter(f => f.category === 'MYSTERY');

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
        <ClipboardCheck className="text-green-500" />
        Official STURP Conclusions (1981)
      </h3>
      <p className="text-neutral-400 text-sm mb-4">
        Written by Dr. John Heller after STURP's final meeting. Released at the October 1981 press conference.
        <a
          href={STURP_CONCLUSIONS.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-amber-500 hover:text-amber-400 inline-flex items-center gap-1"
        >
          View original <ExternalLink size={12} />
        </a>
      </p>

      {/* Key Findings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-neutral-900/50 rounded-lg border border-neutral-800 p-4">
          <h4 className="text-red-400 font-medium text-sm mb-3 flex items-center gap-2">
            <XCircle size={16} /> What Was NOT Found
          </h4>
          <ul className="space-y-2">
            {negativeFindings.map((f) => (
              <li key={f.id} className={`text-xs p-2 rounded border-l-2 ${getCategoryColor(f.category)}`}>
                <p className="text-neutral-200">{f.finding}</p>
                {f.details && <p className="text-neutral-500 mt-1">{f.details}</p>}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-neutral-900/50 rounded-lg border border-neutral-800 p-4">
          <h4 className="text-green-400 font-medium text-sm mb-3 flex items-center gap-2">
            <CheckCircle2 size={16} /> What WAS Found
          </h4>
          <ul className="space-y-2">
            {positiveFindings.map((f) => (
              <li key={f.id} className={`text-xs p-2 rounded border-l-2 ${getCategoryColor(f.category)}`}>
                <p className="text-neutral-200">{f.finding}</p>
                {f.details && <p className="text-neutral-500 mt-1">{f.details}</p>}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-neutral-900/50 rounded-lg border border-neutral-800 p-4">
          <h4 className="text-amber-400 font-medium text-sm mb-3 flex items-center gap-2">
            <HelpCircle size={16} /> The Mystery
          </h4>
          <ul className="space-y-2">
            {mysteryFindings.map((f) => (
              <li key={f.id} className={`text-xs p-2 rounded border-l-2 ${getCategoryColor(f.category)}`}>
                <p className="text-neutral-200">{f.finding}</p>
                {f.details && <p className="text-neutral-500 mt-1">{f.details}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full Text Toggle */}
      <button
        onClick={() => setShowFullText(!showFullText)}
        className="text-sm text-neutral-400 hover:text-white flex items-center gap-2 mb-3"
      >
        {showFullText ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {showFullText ? 'Hide' : 'Show'} full original text
      </button>

      {showFullText && (
        <div className="bg-neutral-900/70 rounded-lg border border-neutral-700 p-6">
          <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line italic">
            "{STURP_CONCLUSIONS.fullText}"
          </p>
          <p className="text-neutral-500 text-xs mt-4">
            — Dr. John Heller, {STURP_CONCLUSIONS.releaseDate}
          </p>
        </div>
      )}
    </div>
  );
};

// Category display names and colors
const CATEGORY_INFO: Record<STURPPaper['category'], { label: string; color: string }> = {
  REFEREED: { label: 'Peer-Reviewed Journal Papers', color: 'text-green-400' },
  OTHER: { label: 'Other STURP Publications', color: 'text-blue-400' },
  FOLLOW_UP: { label: 'Follow-up Research', color: 'text-purple-400' },
  UNPUBLISHED: { label: 'Previously Unpublished', color: 'text-amber-400' },
  PROCEEDINGS: { label: 'Conference Proceedings', color: 'text-cyan-400' }
};

const STURPPapersSection: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<STURPPaper['category'] | null>('REFEREED');

  const categories: STURPPaper['category'][] = ['REFEREED', 'OTHER', 'FOLLOW_UP', 'UNPUBLISHED', 'PROCEEDINGS'];

  const papersByCategory = categories.reduce((acc, cat) => {
    acc[cat] = STURP_PAPERS.filter(p => p.category === cat);
    return acc;
  }, {} as Record<STURPPaper['category'], STURPPaper[]>);

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
        <FileText className="text-amber-500" />
        STURP Published Papers
      </h3>
      <p className="text-neutral-400 text-sm mb-6">
        40 scientific papers from the 1978 Shroud of Turin Research Project. PDFs are cached offline after first view.
      </p>

      <div className="space-y-3">
        {categories.map((category) => {
          const papers = papersByCategory[category];
          const isExpanded = expandedCategory === category;
          const { label, color } = CATEGORY_INFO[category];

          return (
            <div key={category} className="bg-neutral-900/50 rounded-lg border border-neutral-800 overflow-hidden">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-800/50 transition-colors"
              >
                <span className={`font-medium ${color}`}>
                  {label} <span className="text-neutral-500 font-normal">({papers.length})</span>
                </span>
                {isExpanded ? <ChevronUp size={18} className="text-neutral-500" /> : <ChevronDown size={18} className="text-neutral-500" />}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  {papers.map((paper) => (
                    <div key={paper.id} className="border-t border-neutral-800 pt-3 first:border-t-0 first:pt-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-neutral-200 font-medium">{paper.title}</p>
                          <p className="text-xs text-neutral-500 mt-1">{paper.authors} • {paper.year}</p>
                          <p className="text-xs text-neutral-600 mt-0.5">{paper.publication}</p>
                          {paper.notes && <p className="text-xs text-amber-600/70 mt-1 italic">{paper.notes}</p>}
                        </div>
                        <div className="flex-shrink-0">
                          {paper.pdfUrl ? (
                            <a
                              href={paper.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-500 text-xs rounded hover:bg-amber-500/20 transition-colors"
                            >
                              <Download size={12} /> PDF
                            </a>
                          ) : paper.abstractUrl ? (
                            <a
                              href={paper.abstractUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded hover:bg-blue-500/20 transition-colors"
                            >
                              <ExternalLink size={12} /> Abstract
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};