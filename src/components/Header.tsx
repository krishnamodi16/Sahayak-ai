import React, { useState, useRef, useEffect } from 'react';
import { Globe, Bell, ChevronDown, MessageSquare, Smartphone, Wifi, Zap, Download, RefreshCw, Database } from 'lucide-react';
import { SupportedLanguage, ShopkeeperUser } from '../types';
import { SUPPORTED_LANGUAGES } from '../services/translations';
import { syncService, SyncStatusInfo } from '../services/syncService';

interface HeaderProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  currentUser: ShopkeeperUser | null;
  onOpenLogin: () => void;
  onLogout?: () => void;
  isOnline?: boolean;
  onToggleOnlineMode?: () => void;
  onOpenWhatsAppOrder?: () => void;
  onOpenInstallApp?: () => void;
  onDataRefresh?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  currentUser,
  onOpenLogin,
  onLogout,
  isOnline = true,
  onToggleOnlineMode,
  onOpenWhatsAppOrder,
  onOpenInstallApp,
  onDataRefresh
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [syncInfo, setSyncInfo] = useState<SyncStatusInfo>(syncService.getStatus());
  const [isManualSyncing, setIsManualSyncing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return syncService.subscribe((info) => setSyncInfo(info));
  }, []);

  const handleManualSync = async () => {
    setIsManualSyncing(true);
    await syncService.syncNow();
    if (onDataRefresh) {
      onDataRefresh();
    }
    setIsManualSyncing(false);
  };

  const currentLangMeta = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-rose-400 to-indigo-500 flex items-center justify-center p-0.5 shadow-2xs">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <span className="text-xs font-black text-indigo-600">S</span>
            </div>
          </div>
          <div>
            <div className="text-base font-bold text-gray-900 leading-tight">
              Sahayak AI
            </div>
            <div className="text-[11px] text-gray-500 font-medium leading-none">
              Friendly shop assistant
            </div>
          </div>
        </div>

        {/* Right: Actions, WhatsApp Share, Mode Pill, Language, User Info */}
        <div className="flex items-center space-x-2.5">
          
          {/* Install Mobile / Desktop App Button */}
          {onOpenInstallApp && (
            <button
              type="button"
              onClick={onOpenInstallApp}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-all cursor-pointer shadow-2xs"
              title="Install Sahayak App on Mobile or Desktop"
            >
              <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Install App</span>
              <span className="sm:hidden">App</span>
            </button>
          )}

          {/* WhatsApp Share Action Button */}
          {onOpenWhatsAppOrder && (
            <button
              type="button"
              onClick={onOpenWhatsAppOrder}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-all cursor-pointer shadow-2xs"
              title="Share purchase order on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">WhatsApp Share</span>
            </button>
          )}

          {/* Backend Status & Sync Controls */}
          <div className="flex items-center space-x-1.5">
            {syncInfo.isBackendConnected ? (
              <div
                className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-xl border bg-emerald-50/80 text-emerald-800 border-emerald-200 shadow-2xs"
                title="Connected to SQLite backend server (Port 5000)"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="text-left leading-none">
                  <div className="text-[10px] font-bold text-emerald-700 flex items-center space-x-1">
                    <Database className="w-2.5 h-2.5 text-emerald-600 inline mr-0.5" />
                    <span>SQLITE SERVER</span>
                  </div>
                  <div className="text-[9px] text-emerald-600 font-medium mt-0.5">
                    {syncInfo.state === 'syncing' ? 'Syncing...' : 'Connected (Port 5000)'}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-xl border bg-amber-50/80 text-amber-900 border-amber-300 shadow-2xs"
                title="Running in local offline mode (IndexedDB)"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <div className="text-left leading-none">
                  <div className="text-[10px] font-bold text-amber-800 flex items-center space-x-1">
                    <span>OFFLINE MODE</span>
                  </div>
                  <div className="text-[9px] text-amber-700 font-medium mt-0.5">IndexedDB Local</div>
                </div>
              </div>
            )}

            {/* Manual Sync Button */}
            <button
              type="button"
              onClick={handleManualSync}
              disabled={syncInfo.state === 'syncing' || isManualSyncing}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer shadow-2xs ${
                syncInfo.isBackendConnected
                  ? 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-indigo-600'
                  : 'border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700'
              }`}
              title={syncInfo.isBackendConnected ? "Sync now with SQLite database" : "Retry connecting to SQLite backend"}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncInfo.state === 'syncing' || isManualSyncing ? 'animate-spin text-indigo-600' : ''}`} />
            </button>
          </div>

          {/* Multilingual Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 text-gray-800 text-xs font-medium border border-gray-200 transition-colors"
            >
              <span>{currentLangMeta.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50">
                <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Select Language
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between ${
                      language === lang.code
                        ? 'bg-purple-50 text-purple-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="text-[11px] text-gray-400">{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Globe & Bell Icons */}
          <button type="button" className="p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            <Globe className="w-4 h-4" />
          </button>
          <button type="button" className="p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            <Bell className="w-4 h-4" />
          </button>

          {/* User Account / Logout */}
          <div className="flex items-center space-x-2 pl-1 text-xs">
            <span className="text-gray-700 font-medium hidden md:inline">
              {currentUser?.email || 'tanmayrathi993@gmail.com'}
            </span>
            <button
              type="button"
              onClick={currentUser ? onLogout : onOpenLogin}
              className="text-red-500 hover:text-red-600 font-semibold cursor-pointer"
            >
              {currentUser ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
