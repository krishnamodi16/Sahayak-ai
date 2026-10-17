import React from 'react';
import { Package, TrendingUp, AlertTriangle, IndianRupee } from 'lucide-react';
import { Product, SaleTransaction, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../services/translations';

interface DashboardStatsProps {
  products: Product[];
  sales: SaleTransaction[];
  language: SupportedLanguage;
  onCardClick?: (cardType: string) => void;
  onOpenWholesaleOrder?: () => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  products,
  sales,
  language,
  onCardClick
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.quantity <= p.lowStockThreshold).length;

  const totalRevenue = sales.reduce((sum, s) => sum + s.amount, 0);
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5 select-none">
      {/* 1. Total Products */}
      <div 
        onClick={() => onCardClick && onCardClick('products')}
        className="bg-white border border-gray-200 rounded-lg p-3.5 hover:border-gray-300 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between text-gray-500 mb-1">
          <span className="text-xs font-medium">{t.stats?.totalItems || 'Total Items'}</span>
          <Package className="w-4 h-4 text-blue-600" />
        </div>
        <p className="text-xl font-bold text-gray-900 leading-tight">
          {totalProducts}
        </p>
        <p className="text-[11px] text-gray-500 mt-0.5">In store catalog</p>
      </div>

      {/* 2. Today's Sales */}
      <div 
        onClick={() => onCardClick && onCardClick('sales')}
        className="bg-white border border-gray-200 rounded-lg p-3.5 hover:border-gray-300 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between text-gray-500 mb-1">
          <span className="text-xs font-medium">{t.stats?.todaysSales || 'Today Sales'}</span>
          <IndianRupee className="w-4 h-4 text-green-600" />
        </div>
        <p className="text-xl font-bold text-gray-900 leading-tight">
          ₹{totalRevenue.toLocaleString('en-IN')}
        </p>
        <p className="text-[11px] text-green-600 font-medium mt-0.5">
          {sales.length} transactions
        </p>
      </div>

      {/* 3. Inventory Value */}
      <div 
        onClick={() => onCardClick && onCardClick('inventory')}
        className="bg-white border border-gray-200 rounded-lg p-3.5 hover:border-gray-300 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between text-gray-500 mb-1">
          <span className="text-xs font-medium">{t.stats?.inventoryValue || 'Inventory Value'}</span>
          <TrendingUp className="w-4 h-4 text-indigo-600" />
        </div>
        <p className="text-xl font-bold text-gray-900 leading-tight">
          ₹{totalInventoryValue.toLocaleString('en-IN')}
        </p>
        <p className="text-[11px] text-gray-500 mt-0.5">{totalProducts} active items</p>
      </div>

      {/* 4. Low Stock Alert */}
      <div 
        onClick={() => onCardClick && onCardClick('lowStock')}
        className={`bg-white border rounded-lg p-3.5 transition-colors cursor-pointer ${
          lowStockCount > 0 ? 'border-yellow-300 bg-yellow-50/40' : 'border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between text-gray-500 mb-1">
          <span className="text-xs font-medium">{t.stats?.lowStock || 'Low Stock'}</span>
          <AlertTriangle className={`w-4 h-4 ${lowStockCount > 0 ? 'text-yellow-600' : 'text-gray-400'}`} />
        </div>
        <p className={`text-xl font-bold leading-tight ${lowStockCount > 0 ? 'text-yellow-700' : 'text-gray-900'}`}>
          {lowStockCount}
        </p>
        <p className="text-[11px] text-gray-500 mt-0.5">
          {lowStockCount > 0 ? 'Items need reorder' : 'All stock healthy'}
        </p>
      </div>
    </div>
  );
};
