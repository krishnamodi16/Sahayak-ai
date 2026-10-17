import React from 'react';
import { Store, User, Phone, Tag, Calendar, LogOut, RefreshCw, X, ShieldCheck, CheckCircle2, Mail } from 'lucide-react';
import { ShopkeeperUser, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../services/translations';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: ShopkeeperUser | null;
  language: SupportedLanguage;
  onSwitchAccount: () => void;
  onLogout: () => void;
  productCount: number;
  saleCount: number;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  language,
  onSwitchAccount,
  onLogout,
  productCount,
  saleCount
}) => {
  if (!isOpen || !user) return null;

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const a = t.auth;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg border-2 border-white/20">
              {user.ownerName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h2 className="text-base font-bold text-white">{user.shopName}</h2>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {a.loggedInAs} <strong className="text-white">{user.ownerName}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Store Profile Details */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Stock Items
              </span>
              <p className="text-base font-black text-slate-800">{productCount} Products</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Sales Recorded
              </span>
              <p className="text-base font-black text-emerald-700">{saleCount} Entries</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-slate-600">
              <div className="flex items-center space-x-2">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold">{a.ownerNameLabel}:</span>
              </div>
              <span className="font-bold text-slate-900">{user.ownerName}</span>
            </div>

            {user.email && (
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold">Registered Email:</span>
                </div>
                <span className="font-medium text-blue-600 text-[11px]">{user.email}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-slate-600">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold">Registered Phone:</span>
              </div>
              <span className="font-mono font-bold text-slate-900">+91 {user.phone}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <div className="flex items-center space-x-2">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold">{a.categoryLabel}:</span>
              </div>
              <span className="font-semibold text-slate-700">{user.category}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold">Store Created:</span>
              </div>
              <span className="text-slate-600">{formatDate(user.createdAt)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onSwitchAccount();
              }}
              className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{a.switchAccount}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{a.logout}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 px-6 py-2.5 text-center text-[10px] text-slate-400 font-medium">
          Offline Session Active • PIN: {user.pin ? '••••' : 'None'}
        </div>
      </div>
    </div>
  );
};
