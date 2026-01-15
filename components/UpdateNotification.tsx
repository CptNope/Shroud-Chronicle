import React, { useState, useEffect } from 'react';
import { DownloadCloud, RefreshCw, X } from 'lucide-react';

export const UpdateNotification: React.FC = () => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Listen for the custom event dispatched from index.html
    const handleSWUpdate = (e: any) => {
      const registration = e.detail;
      if (registration && registration.waiting) {
        setWaitingWorker(registration.waiting);
        setShow(true);
      }
    };

    window.addEventListener('swUpdated', handleSWUpdate);

    // Also check if one is already waiting on mount
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg && reg.waiting) {
          setWaitingWorker(reg.waiting);
          setShow(true);
        }
      });
    }

    return () => window.removeEventListener('swUpdated', handleSWUpdate);
  }, []);

  const updateServiceWorker = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] w-[90%] max-w-md animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-neutral-800/95 backdrop-blur-md border border-neutral-700 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 text-blue-400 p-2 rounded-full">
            <DownloadCloud size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold">New Version Available</h4>
            <p className="text-xs text-neutral-400">Content has been updated.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={updateServiceWorker}
             className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-xs font-bold transition-colors flex items-center gap-2"
           >
             <RefreshCw size={12} /> Refresh
           </button>
           <button 
             onClick={() => setShow(false)}
             className="p-1.5 hover:bg-neutral-700 rounded text-neutral-400 hover:text-white transition-colors"
           >
             <X size={16} />
           </button>
        </div>
      </div>
    </div>
  );
};