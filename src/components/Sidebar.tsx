import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, Mic, FileText, Settings, Smartphone, Download } from 'lucide-react';

export type NavTab = 'dashboard' | 'inventory' | 'sales' | 'voice' | 'reports' | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenInstallApp?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onOpenInstallApp }) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory' as NavTab, label: 'Inventory', icon: Package },
    { id: 'sales' as NavTab, label: 'Sales', icon: ShoppingCart },
    { id: 'voice' as NavTab, label: 'Voice Assistant', icon: Mic },
    { id: 'reports' as NavTab, label: 'Reports', icon: FileText },
    { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col justify-between flex-shrink-0 min-h-[calc(100vh-61px)] select-none">
      <div className="p-4 space-y-6">
        {/* Voice Assistant Mini Badge */}
        <div className="flex items-center space-x-3 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-400 via-purple-400 to-teal-400 flex items-center justify-center p-0.5 shadow-xs">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <span className="text-[10px] font-black text-indigo-600">S</span>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900 leading-tight">Sahayak AI</div>
            <div className="text-[10px] text-gray-500 font-medium">Voice Assistant</div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'border border-purple-200 text-purple-700 bg-purple-50/50 shadow-2xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer & Install App Card */}
      <div className="p-3 space-y-2 border-t border-gray-100">
        {onOpenInstallApp && (
          <button
            type="button"
            onClick={onOpenInstallApp}
            className="w-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-100/80 rounded-2xl p-3 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-2.5 mb-1">
              <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Smartphone className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-gray-900">Install Mobile App</span>
            </div>
            <p className="text-[10px] text-gray-500 leading-tight">
              Get 1-click home screen billing with 100% offline access.
            </p>
          </button>
        )}

        <div className="px-2 pt-1 text-[10px] text-gray-400 leading-tight">
          <p>Offline Mode • Data stored locally.</p>
        </div>
      </div>
    </aside>
  );
};

