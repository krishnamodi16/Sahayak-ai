import React, { useState } from 'react';
import { Smartphone, Download, CheckCircle2, Share, PlusSquare, X, Monitor, ShieldCheck, Zap, WifiOff } from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => Promise<string>;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  onInstall,
  isInstallable,
  isInstalled,
  isIOS
}) => {
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'success'>('idle');
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  const currentNetworkUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5174';

  const handleInstallClick = async () => {
    setInstallStatus('installing');
    try {
      const outcome = await onInstall();
      if (outcome === 'accepted') {
        setInstallStatus('success');
      } else {
        setInstallStatus('idle');
      }
    } catch (e) {
      setInstallStatus('idle');
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-in fade-in duration-200">
        
        {/* Header with App Banner */}
        <div className="bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-700 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-lg flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-inner">
                S
              </div>
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold tracking-wide uppercase mb-1">
                <span>Progressive Web App</span>
              </div>
              <h2 className="text-xl font-bold text-white leading-tight">Install Sahayak App</h2>
              <p className="text-xs text-indigo-100 mt-0.5">Voice Billing & Digital Khata on your Home Screen</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          {/* Key Advantages Pills */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3 text-center">
              <WifiOff className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-gray-900">100% Offline</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Works without internet</div>
            </div>
            <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3 text-center">
              <Zap className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-gray-900">Instant Launch</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Zero load lag</div>
            </div>
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 text-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-gray-900">Safe & Private</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Stored locally</div>
            </div>
          </div>

          {/* Installation Action Section */}
          {isInstalled ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center space-x-3 text-emerald-900">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <div className="text-sm font-bold">App is already installed!</div>
                <div className="text-xs text-emerald-700 mt-0.5">You can launch Sahayak AI directly from your app drawer or home screen anytime.</div>
              </div>
            </div>
          ) : isIOS ? (
            /* iOS Specific Instructions */
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
                <Smartphone className="w-4 h-4 text-amber-700" />
                <span>How to Install on iPhone / iPad (Safari)</span>
              </div>
              <ol className="text-xs text-gray-700 space-y-2 pl-4 list-decimal">
                <li>
                  Tap the <strong className="inline-flex items-center text-indigo-700 mx-1"><Share className="w-3.5 h-3.5 mr-0.5" /> Share</strong> button in Safari's bottom toolbar.
                </li>
                <li>
                  Scroll down and tap <strong className="inline-flex items-center text-indigo-700 mx-1"><PlusSquare className="w-3.5 h-3.5 mr-0.5" /> Add to Home Screen</strong>.
                </li>
                <li>
                  Tap <strong>Add</strong> in the top right corner. Done!
                </li>
              </ol>
            </div>
          ) : (
            /* Android & Chrome / Edge 1-Click Install */
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleInstallClick}
                disabled={installStatus === 'installing'}
                className="w-full py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
              >
                <Download className="w-5 h-5" />
                <span>{installStatus === 'installing' ? 'Opening Prompt...' : '1-Click Install Sahayak App'}</span>
              </button>

              <p className="text-[11px] text-center text-gray-500">
                Installs directly to your Android Home Screen / Windows PC without needing the Play Store.
              </p>
            </div>
          )}

          {/* Open on Phone via Network URL */}
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-700">Open on Mobile via WiFi / Network:</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
              >
                {copiedUrl ? 'Link Copied!' : 'Copy Link'}
              </button>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-mono text-gray-700 flex items-center justify-between break-all">
              <span>{currentNetworkUrl}</span>
            </div>
            <p className="text-[10px] text-gray-400">
              Tip: Open this URL on your Android or iPhone browser to install the mobile app instantly!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Version 1.0 • PWA Ready</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
