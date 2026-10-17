import React, { useState } from 'react';
import { SupportedLanguage, ShopkeeperUser, AppSettings } from '../types';
import { SUPPORTED_LANGUAGES } from '../services/translations';

interface SettingsViewProps {
  currentUser: ShopkeeperUser | null;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onUpdateProfile?: (profile: { shopName: string; ownerName: string; category: string; language: SupportedLanguage }) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentUser,
  settings,
  onUpdateSettings,
  onUpdateProfile
}) => {
  const [businessName, setBusinessName] = useState(currentUser?.shopName || 'veg shop');
  const [ownerName, setOwnerName] = useState(currentUser?.ownerName || 'Tanmay');
  const [category, setCategory] = useState(currentUser?.category || 'Grocery Store');
  const [language, setLanguage] = useState<SupportedLanguage>(settings.language || 'en');
  
  // Voice input card state
  const [voiceInputEnabled, setVoiceInputEnabled] = useState(settings.voiceFeedbackEnabled);
  const [voiceLanguage, setVoiceLanguage] = useState<SupportedLanguage>(settings.language || 'en');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile({
        shopName: businessName,
        ownerName: ownerName,
        category: category,
        language: language
      });
    }
    onUpdateSettings({
      language: language,
      voiceFeedbackEnabled: voiceInputEnabled
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">Settings</h1>
        <p className="text-xs text-gray-500 mt-1">Manage app preferences and data</p>
      </div>

      {/* 2 Main Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left Card: Profile */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Profile</h3>
          
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Business name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-purple-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Owner name
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-purple-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Business category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-purple-600 font-medium"
              >
                <option value="Grocery Store">Grocery Store</option>
                <option value="Vegetable & Fruit Shop">Vegetable & Fruit Shop</option>
                <option value="General Store / Kirana">General Store / Kirana</option>
                <option value="Dairy & Milk Parlor">Dairy & Milk Parlor</option>
                <option value="Medical Store">Medical Store</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-purple-600 font-medium"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
            {savedSuccess && (
              <p className="text-xs text-green-600 font-medium text-center">Settings saved successfully!</p>
            )}
          </form>
        </div>

        {/* Right Card: Voice input */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs h-fit">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Voice input</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="voice-input-check"
                checked={voiceInputEnabled}
                onChange={(e) => {
                  setVoiceInputEnabled(e.target.checked);
                  onUpdateSettings({ voiceFeedbackEnabled: e.target.checked });
                }}
                className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500 cursor-pointer"
              />
              <label htmlFor="voice-input-check" className="text-xs font-medium text-gray-800 cursor-pointer">
                Voice input
              </label>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Voice language
              </label>
              <select
                value={voiceLanguage}
                onChange={(e) => {
                  const newLang = e.target.value as SupportedLanguage;
                  setVoiceLanguage(newLang);
                  onUpdateSettings({ language: newLang });
                }}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-purple-600 font-medium"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
