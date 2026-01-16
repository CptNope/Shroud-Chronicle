import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check localStorage for dismissed state (don't show again for 7 days)
    const dismissedAt = localStorage.getItem('installPromptDismissed');
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < sevenDays) {
        return;
      }
    }

    // Capture the install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after a short delay (better UX than immediate popup)
      setTimeout(() => setShowPrompt(true), 2000);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      console.log('[PWA] App installed successfully');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for user choice
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] User ${outcome} the install prompt`);

    // Clear the deferred prompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember dismissal for 7 days
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  // Don't show if already installed or no prompt available
  if (isInstalled || !showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-[99] w-[90%] max-w-md animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-r from-amber-900/90 to-neutral-800/95 backdrop-blur-md border border-amber-700/50 text-white p-4 rounded-xl shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="bg-amber-500/20 text-amber-400 p-2.5 rounded-full flex-shrink-0">
            <Smartphone size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-amber-100">Install Shroud Chronicle</h4>
            <p className="text-xs text-neutral-300 mt-1">
              Add to your home screen for quick access and offline viewing
            </p>
            <div className="flex items-center gap-2 mt-3">
              <button 
                onClick={handleInstall}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-lg"
              >
                <Download size={14} /> Install App
              </button>
              <button 
                onClick={handleDismiss}
                className="px-3 py-2 hover:bg-neutral-700/50 rounded-lg text-xs text-neutral-400 hover:text-white transition-colors"
              >
                Not now
              </button>
            </div>
          </div>
          <button 
            onClick={handleDismiss}
            className="p-1 hover:bg-neutral-700/50 rounded text-neutral-500 hover:text-white transition-colors flex-shrink-0"
            title="Dismiss"
            aria-label="Dismiss install prompt"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
