import React, { useState } from 'react';
import { Plus, Clock, Search, Receipt, ArrowUpRight, MessageSquare, Share2 } from 'lucide-react';
import { SaleTransaction, SupportedLanguage } from '../types/index';
import { formatINR } from '../services/businessLogic';
import { TRANSLATIONS, UNIT_TRANSLATIONS, getLocalizedProductName } from '../services/translations';
import { getProductEmoji } from './InventoryTable';

interface SalesLedgerProps {
  sales: SaleTransaction[];
  language: SupportedLanguage;
  onRecordManualSale: () => void;
}

export const SalesLedger: React.FC<SalesLedgerProps> = ({
  sales,
  language,
  onRecordManualSale
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const sTrans = t.sales;
  const unitDict = UNIT_TRANSLATIONS[language] || UNIT_TRANSLATIONS.en;

  // Calculate today's earnings
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaySales = sales.filter(s => s.timestamp >= today.getTime());
  const todayTotal = todaySales.reduce((sum, s) => sum + s.amount, 0);

  const filteredSales = sales.filter(s => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const localizedName = getLocalizedProductName(s.productName, language).toLowerCase();
    return s.productName.toLowerCase().includes(term) || localizedName.includes(term) || s.amount.toString().includes(term);
  });

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    const isToday = new Date().toDateString() === d.toDateString();
    if (isToday) return sTrans.todayBadge;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const handleShareWhatsAppReceipt = (sale: SaleTransaction) => {
    const text = `🧾 *Store Receipt / रसीद*\n\n` +
      `📦 Product: ${sale.productName}\n` +
      `⚖️ Qty: ${sale.quantity} ${sale.unit}\n` +
      `💵 Total Paid: ₹${sale.amount}\n` +
      `📅 Date: ${new Date(sale.timestamp).toLocaleString('en-IN')}\n\n` +
      `🙏 Thank you for your purchase!`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-6 select-none">
      
      {/* Top Banner (Khatabook Green Banner) */}
      <div className="p-5 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-1">
            {sTrans.todaysEarningsTitle}
          </span>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl sm:text-4xl font-black text-white tabular-nums tracking-tight">
              {formatINR(todayTotal)}
            </span>
            <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
              {todaySales.length} {t.stats.transactionsLabel.toLowerCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onRecordManualSale}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white rounded-2xl text-xs sm:text-sm font-black shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{sTrans.recordSaleBtn}</span>
          </button>
        </div>
      </div>

      {/* Subheader & Search */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
        <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center space-x-2">
          <Receipt className="w-4 h-4 text-emerald-600" />
          <span>{sTrans.title}</span>
          <span className="text-xs text-slate-400 font-bold">({sales.length})</span>
        </h4>

        <div className="relative w-full sm:w-60">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={sTrans.searchPlaceholder}
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs font-semibold"
          />
        </div>
      </div>

      {/* Sales Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-wider">
              <th scope="col" className="py-3 px-4 sm:px-6">{sTrans.colTime}</th>
              <th scope="col" className="py-3 px-4">{sTrans.colProduct}</th>
              <th scope="col" className="py-3 px-4 text-center">{sTrans.colQty}</th>
              <th scope="col" className="py-3 px-4 text-right">{sTrans.colAmount}</th>
              <th scope="col" className="py-3 px-4 text-center">{sTrans.colType}</th>
              <th scope="col" className="py-3 px-4 text-center">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {filteredSales.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400 font-bold">
                  {sTrans.noSales}
                </td>
              </tr>
            ) : (
              filteredSales.map((sale) => {
                const localizedProdName = getLocalizedProductName(sale.productName, language);
                const localizedUnit = unitDict[sale.unit] || sale.unit;
                const emoji = getProductEmoji(sale.productName);

                return (
                  <tr key={sale.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatTime(sale.timestamp)}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({formatDate(sale.timestamp)})</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-extrabold text-slate-900">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-lg">{emoji}</span>
                        <div>
                          <span className="text-sm font-black block">{localizedProdName}</span>
                          {localizedProdName !== sale.productName && (
                            <span className="text-[10px] text-slate-400 font-medium">{sale.productName}</span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center font-bold text-slate-700 text-sm">
                      {sale.quantity} {localizedUnit}
                    </td>

                    <td className="py-3.5 px-4 text-right font-black text-emerald-700 text-base tabular-nums">
                      +{formatINR(sale.amount)}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-[10px] font-black bg-slate-100 text-slate-700 border border-slate-200">
                        {sale.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleShareWhatsAppReceipt(sale)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all cursor-pointer active:scale-95"
                        title="Share on WhatsApp"
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-600" />
                        <span>Share</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
