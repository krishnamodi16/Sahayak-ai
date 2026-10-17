import React from 'react';
import { Product, SaleTransaction, SupportedLanguage, ExecutionResult } from '../types';
import { DashboardStats } from './DashboardStats';
import { VoiceAssistant } from './VoiceAssistant';

interface DashboardViewProps {
  products: Product[];
  sales: SaleTransaction[];
  language: SupportedLanguage;
  onExecuteCommand: (commandText: string) => Promise<ExecutionResult>;
  lastResult: ExecutionResult | null;
  onQuickAction: (actionType: 'add' | 'sale' | 'stock' | 'earnings' | 'low_stock') => void;
  onOpenWholesaleOrder?: () => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  sales,
  language,
  onExecuteCommand,
  lastResult,
  onQuickAction,
  onOpenWholesaleOrder,
  onNavigateTab
}) => {
  return (
    <div className="space-y-6 select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">Dashboard</h1>
        <p className="text-xs text-gray-500 mt-1">Overview of your shop activity</p>
      </div>

      {/* 4 Summary Cards */}
      <DashboardStats
        products={products}
        sales={sales}
        language={language}
        onCardClick={(type) => {
          if (type === 'products' || type === 'inventory' || type === 'lowStock') {
            onNavigateTab('inventory');
          } else if (type === 'sales') {
            onExecuteCommand('Check today earnings');
          }
        }}
      />

      {/* Voice Assistant Terminal */}
      <VoiceAssistant
        language={language}
        onExecuteCommand={onExecuteCommand}
        lastResult={lastResult}
        onQuickAction={onQuickAction}
        onOpenWholesaleOrder={onOpenWholesaleOrder}
      />
    </div>
  );
};
