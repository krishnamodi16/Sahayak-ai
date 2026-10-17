import React, { useState } from 'react';
import { X, Volume2, VolumeX, Globe, AlertTriangle, Download, RefreshCw, Trash2, Check, Shield } from 'lucide-react';
import { AppSettings, SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../services/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
  onResetDemo: () => void;
  onClearAll: () => void;
  onExportBackup: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onResetDemo,
  onClearAll,
  onExportBackup
}) => {
  const [localSettings, setLocalSettings] = useState<AppSettings>({ ...settings });
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const t = TRANSLATIONS[localSettings.language] || TRANSLATIONS.en;
  const sTrans = t.settings;

  const handleSave = () => {
    onSaveSettings(localSettings);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  const handleClearConfirmed = () => {
    onClearAll();
    setShowClearConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-blue-600 text-white shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 leading-tight">
                {sTrans.title}
              </h3>
              <p className="text-xs text-slate-500 font-bold mt-0.5">
                {t.offlineBadge} • 100% On-Device Storage
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Language Selection */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{sTrans.langSection}</span>
            </label>
            <select
              value={localSettings.language}
              onChange={(e) => setLocalSettings({ ...localSettings, language: e.target.value as SupportedLanguage })}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Voice Response Soundbox */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-slate-900">
                {sTrans.voiceConfirmation}
              </p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {sTrans.voiceDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLocalSettings({ ...localSettings, voiceFeedbackEnabled: !localSettings.voiceFeedbackEnabled })}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
                localSettings.voiceFeedbackEnabled
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {localSettings.voiceFeedbackEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>

          {/* Low Stock Warning Threshold */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>{sTrans.thresholdTitle}</span>
              </label>
              <span className="text-xs font-black text-blue-600 px-2 py-0.5 bg-blue-50 rounded-full">
                {localSettings.lowStockThreshold} units
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-2">
              {sTrans.thresholdDesc}
            </p>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={localSettings.lowStockThreshold}
              onChange={(e) => setLocalSettings({ ...localSettings, lowStockThreshold: parseInt(e.target.value, 10) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Data Backup & Reset Actions */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">
              {sTrans.dbManagement}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={onExportBackup}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>{sTrans.exportBackup}</span>
              </button>

              <button
                type="button"
                onClick={onResetDemo}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-blue-600" />
                <span>{sTrans.resetDemo}</span>
              </button>
            </div>

            {/* Clear All Data */}
            {!showClearConfirm ? (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 text-xs font-bold transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-rose-600" />
                <span>{sTrans.clearAll}</span>
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                <p className="text-xs font-black text-rose-900 leading-tight">
                  {sTrans.clearWarning}
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleClearConfirmed}
                    className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm"
                  >
                    {sTrans.confirmClear}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    {t.modals.cancel}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl transition-colors cursor-pointer"
          >
            {t.modals.cancel}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-black shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved!</span>
              </>
            ) : (
              <span>{sTrans.saveChanges}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
