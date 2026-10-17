import React, { useState } from 'react';
import { Store, User, Lock, Phone, ArrowRight, Sparkles, CheckCircle2, AlertCircle, X, Tag, Mail } from 'lucide-react';
import { ShopkeeperUser, SupportedLanguage } from '../types';
import { authService, DEMO_PRESET_USERS } from '../services/authService';
import { TRANSLATIONS } from '../services/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  language: SupportedLanguage;
  onAuthSuccess: (user: ShopkeeperUser) => void;
  canDismiss?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  onAuthSuccess,
  canDismiss = true
}) => {
  const [tab, setTab] = useState<'login' | 'signup' | 'demo'>('login');
  
  // Login form state (Supports Email, Mobile Number, or Shop Name)
  const [loginQuery, setLoginQuery] = useState('ramesh.kirana@sahayak.ai');
  const [loginPin, setLoginPin] = useState('1234');
  
  // Signup form state
  const [signupOwner, setSignupOwner] = useState('');
  const [signupShop, setSignupShop] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPin, setSignupPin] = useState('');
  const [signupCategory, setSignupCategory] = useState('Kirana & General Store (किराना स्टोर)');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const a = t.auth;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await authService.login(loginQuery, loginPin);
      if (res.success && res.user) {
        onAuthSuccess(res.user);
      } else {
        setErrorMsg(res.error || 'Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await authService.register({
        ownerName: signupOwner,
        shopName: signupShop,
        email: signupEmail ? signupEmail.trim() : undefined,
        phone: signupPhone,
        pin: signupPin,
        category: signupCategory,
        language
      });
      if (res.success && res.user) {
        onAuthSuccess(res.user);
      } else {
        setErrorMsg(res.error || 'Registration failed.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoClick = async (presetUser: ShopkeeperUser) => {
    setErrorMsg(null);
    setIsLoading(true);
    try {
      const u = await authService.quickSwitchDemoUser(presetUser.id);
      if (u) {
        onAuthSuccess(u);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to switch demo user.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative">
          {canDismiss && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>{tab === 'login' ? a.loginTitle : tab === 'signup' ? a.signUpTitle : a.demoProfilesTitle}</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  100% Offline
                </span>
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                {tab === 'login' ? a.loginSubtitle : tab === 'signup' ? a.signUpSubtitle : a.demoProfilesDesc}
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-slate-800/80 p-1 rounded-xl mt-4 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setTab('login'); setErrorMsg(null); }}
              className={`flex-1 py-2 rounded-lg transition-all text-center cursor-pointer ${
                tab === 'login'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {a.switchTabLogin}
            </button>
            <button
              type="button"
              onClick={() => { setTab('signup'); setErrorMsg(null); }}
              className={`flex-1 py-2 rounded-lg transition-all text-center cursor-pointer ${
                tab === 'signup'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {a.switchTabSignUp}
            </button>
            <button
              type="button"
              onClick={() => { setTab('demo'); setErrorMsg(null); }}
              className={`flex-1 py-2 rounded-lg transition-all text-center cursor-pointer flex items-center justify-center space-x-1 ${
                tab === 'demo'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-amber-400 hover:text-amber-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Demo</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. LOGIN TAB (Email or Phone or Shop Name) */}
          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {a.phoneOrNameLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={loginQuery}
                    onChange={(e) => setLoginQuery(e.target.value)}
                    placeholder={a.phoneOrNamePlaceholder}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  💡 You can log in using your registered Email, 10-digit mobile number, or store name.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {a.pinLabel}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={loginPin}
                    onChange={(e) => setLoginPin(e.target.value)}
                    placeholder={a.pinPlaceholder}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest font-mono font-bold"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Default Demo PIN: <span className="font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">1234</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{isLoading ? 'Verifying...' : a.loginBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 2. SIGNUP TAB (New Store Registration with Email & Phone) */}
          {tab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {a.ownerNameLabel} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={signupOwner}
                    onChange={(e) => setSignupOwner(e.target.value)}
                    placeholder={a.ownerNamePlaceholder}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {a.shopNameLabel} *
                </label>
                <div className="relative">
                  <Store className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={signupShop}
                    onChange={(e) => setSignupShop(e.target.value)}
                    placeholder={a.shopNamePlaceholder}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {a.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder={a.emailPlaceholder}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      maxLength={10}
                      required
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Set 4-Digit PIN *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={signupPin}
                      onChange={(e) => setSignupPin(e.target.value)}
                      placeholder="e.g. 1234"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {a.categoryLabel}
                </label>
                <div className="relative">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={signupCategory}
                    onChange={(e) => setSignupCategory(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
                  >
                    <option value="Kirana & General Store (किराना स्टोर)">Kirana & Grocery Store (किराना स्टोर)</option>
                    <option value="Supermarket / Provision (પટેલ સ્ટોર)">Supermarket & Provision Store</option>
                    <option value="Dairy & Milk Parlour (डेयरी)">Dairy & Milk Booth (डेयरी)</option>
                    <option value="Wholesale & Retail (மளிகை)">Wholesale & Retail Maligai</option>
                    <option value="Medical & Pharmacy (दवाखाना)">Medical & General Pharmacy</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{isLoading ? 'Creating Store...' : a.signUpBtn}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 3. DEMO PROFILES TAB (HACKATHON QUICK SWITCH) */}
          {tab === 'demo' && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Hackathon Demo Profiles:</strong> Click any store below to instantly log in as that shopkeeper without needing to type PINs or credentials!
                </span>
              </div>

              <div className="space-y-2.5">
                {DEMO_PRESET_USERS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleQuickDemoClick(preset)}
                    className="w-full text-left p-3.5 bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 rounded-2xl transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 group-hover:bg-blue-600 text-white flex items-center justify-center font-bold text-sm transition-colors">
                        {preset.ownerName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-900">
                          {preset.shopName}
                        </h4>
                        <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                          <span>Owner: <strong className="text-slate-700">{preset.ownerName}</strong></span>
                          <span>•</span>
                          <span className="text-blue-600 font-medium">{preset.email}</span>
                          <span>•</span>
                          <span>📞 {preset.phone}</span>
                        </div>
                        <span className="inline-block text-[10px] font-bold text-slate-400 mt-0.5">
                          {preset.category}
                        </span>
                      </div>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-white group-hover:bg-blue-600 group-hover:text-white border border-slate-200 group-hover:border-blue-600 text-xs font-bold text-slate-700 transition-all flex items-center space-x-1">
                      <span>Login</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Info */}
        <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 text-center text-[11px] text-slate-500 font-medium">
          🔒 Secure Offline Authentication • Credentials encrypted in local IndexedDB
        </div>
      </div>
    </div>
  );
};
