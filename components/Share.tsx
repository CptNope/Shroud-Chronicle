import React, { useState } from 'react';
import { QrCode, Github, Globe, Copy, Check, Share2, ExternalLink, Smartphone } from 'lucide-react';

interface ShareProps {
  lens: 'SKEPTIC' | 'BELIEVER';
}

const APP_URL = 'https://cptnope.github.io/Shroud-Chronicle/';
const GITHUB_REPO = 'https://github.com/CptNope/Shroud-Chronicle';

export const Share: React.FC<ShareProps> = ({ lens }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const isBeliever = lens === 'BELIEVER';

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'The Shroud Chronicle',
          text: 'Explore the history, science, and mystery of the Shroud of Turin through dual lenses of faith and science.',
          url: APP_URL,
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    }
  };

  // QR Code API URL (using qrserver.com - free, no API key needed)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(APP_URL)}&bgcolor=1a1a1a&color=ffffff&margin=10`;

  const links = [
    {
      id: 'app',
      label: 'Live App',
      url: APP_URL,
      icon: Globe,
      description: 'Open the Shroud Chronicle PWA',
    },
    {
      id: 'github',
      label: 'GitHub Repository',
      url: GITHUB_REPO,
      icon: Github,
      description: 'View source code and documentation',
    },
    {
      id: 'readme',
      label: 'Documentation',
      url: `${GITHUB_REPO}#readme`,
      icon: ExternalLink,
      description: 'Architecture diagrams and setup guide',
    },
    {
      id: 'issues',
      label: 'Report Issues',
      url: `${GITHUB_REPO}/issues`,
      icon: ExternalLink,
      description: 'Submit bugs or feature requests',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-10">
        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full mb-4 ${isBeliever ? 'bg-amber-900/30 text-amber-400' : 'bg-cyan-900/30 text-cyan-400'}`}>
          <Share2 size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Share</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3">Share The Shroud Chronicle</h1>
        <p className="text-neutral-400 max-w-xl mx-auto">
          Spread the dual-lens approach to Shroud research. Scan the QR code or use the links below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* QR Code Section */}
        <div className={`bg-neutral-900/50 border rounded-2xl p-6 ${isBeliever ? 'border-amber-900/30' : 'border-cyan-900/30'}`}>
          <div className="flex items-center gap-2 mb-4">
            <QrCode className={isBeliever ? 'text-amber-500' : 'text-cyan-500'} size={24} />
            <h2 className="text-xl font-bold text-white">Quick Share QR Code</h2>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-neutral-800 p-4 rounded-xl mb-4 border border-neutral-700">
              <img 
                src={qrCodeUrl} 
                alt="QR Code to Shroud Chronicle"
                className="w-[250px] h-[250px] rounded-lg"
                loading="lazy"
              />
            </div>
            
            <p className="text-sm text-neutral-500 text-center mb-4">
              <Smartphone size={14} className="inline mr-1" />
              Point your phone camera at this code to open the app
            </p>

            <div className="w-full space-y-2">
              <div className="flex items-center gap-2 bg-neutral-800/50 rounded-lg p-3 border border-neutral-700">
                <label htmlFor="share-url" className="sr-only">App URL</label>
                <input 
                  id="share-url"
                  type="text" 
                  value={APP_URL} 
                  readOnly 
                  title="Shroud Chronicle URL"
                  className="flex-1 bg-transparent text-sm text-neutral-300 outline-none truncate"
                />
                <button
                  onClick={() => copyToClipboard(APP_URL, 'url')}
                  className={`p-2 rounded-lg transition-colors ${copied === 'url' ? 'bg-green-600 text-white' : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300'}`}
                  title="Copy URL"
                >
                  {copied === 'url' ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Native Share Button (mobile) */}
              {'share' in navigator && (
                <button
                  onClick={handleNativeShare}
                  className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors ${isBeliever ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}
                >
                  <Share2 size={18} />
                  Share via Device
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className={`bg-neutral-900/50 border rounded-2xl p-6 ${isBeliever ? 'border-amber-900/30' : 'border-cyan-900/30'}`}>
          <div className="flex items-center gap-2 mb-4">
            <ExternalLink className={isBeliever ? 'text-amber-500' : 'text-cyan-500'} size={24} />
            <h2 className="text-xl font-bold text-white">Quick Links</h2>
          </div>

          <div className="space-y-3">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-600 rounded-xl transition-all group"
              >
                <div className={`p-3 rounded-lg ${isBeliever ? 'bg-amber-900/30 text-amber-400 group-hover:bg-amber-900/50' : 'bg-cyan-900/30 text-cyan-400 group-hover:bg-cyan-900/50'} transition-colors`}>
                  <link.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white group-hover:text-neutral-100">{link.label}</h3>
                  <p className="text-sm text-neutral-500 truncate">{link.description}</p>
                </div>
                <ExternalLink size={16} className="text-neutral-600 group-hover:text-neutral-400 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>

          {/* Copy All Links */}
          <button
            onClick={() => copyToClipboard(
              `The Shroud Chronicle\n\n🌐 Live App: ${APP_URL}\n📦 GitHub: ${GITHUB_REPO}\n📖 Docs: ${GITHUB_REPO}#readme`,
              'all'
            )}
            className={`w-full mt-4 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors border ${copied === 'all' ? 'bg-green-600 border-green-500 text-white' : 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-neutral-300'}`}
          >
            {copied === 'all' ? <Check size={18} /> : <Copy size={18} />}
            {copied === 'all' ? 'Copied!' : 'Copy All Links'}
          </button>
        </div>
      </div>

      {/* Social Preview Card */}
      <div className={`mt-8 bg-neutral-900/50 border rounded-2xl p-6 ${isBeliever ? 'border-amber-900/30' : 'border-cyan-900/30'}`}>
        <h2 className="text-lg font-bold text-white mb-4">Share Message Preview</h2>
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <p className="text-neutral-300 whitespace-pre-line text-sm">
            🔬 Check out The Shroud Chronicle - a dual-lens PWA exploring the Shroud of Turin through both faith and science perspectives.
            {'\n\n'}
            ✨ Features:{'\n'}
            • Toggle between Skeptic & Believer views{'\n'}
            • Interactive timeline & forensic labs{'\n'}
            • Viral claim fact-checking{'\n'}
            • Works offline as a PWA
            {'\n\n'}
            🔗 {APP_URL}
          </p>
          <button
            onClick={() => copyToClipboard(
              `🔬 Check out The Shroud Chronicle - a dual-lens PWA exploring the Shroud of Turin through both faith and science perspectives.\n\n✨ Features:\n• Toggle between Skeptic & Believer views\n• Interactive timeline & forensic labs\n• Viral claim fact-checking\n• Works offline as a PWA\n\n🔗 ${APP_URL}`,
              'message'
            )}
            className={`mt-4 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors ${copied === 'message' ? 'bg-green-600 text-white' : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300'}`}
          >
            {copied === 'message' ? <Check size={16} /> : <Copy size={16} />}
            {copied === 'message' ? 'Copied!' : 'Copy Message'}
          </button>
        </div>
      </div>
    </div>
  );
};
