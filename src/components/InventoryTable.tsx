import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, AlertCircle, CheckCircle2, ChevronUp, ChevronDown, PlusCircle, MinusCircle, LayoutGrid, List, MessageSquare } from 'lucide-react';
import { Product, SupportedLanguage } from '../types/index';
import { formatINR } from '../services/businessLogic';
import { TRANSLATIONS, UNIT_TRANSLATIONS, getLocalizedProductName } from '../services/translations';

interface InventoryTableProps {
  products: Product[];
  language: SupportedLanguage;
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string, name: string) => void;
  onQuickUpdateStock: (id: string, delta: number) => void;
  onOpenWholesaleOrder?: (product?: Product) => void;
}

type SortField = 'name' | 'quantity' | 'price' | 'value';
type SortOrder = 'asc' | 'desc';

export const getProductEmoji = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes('rice') || lower.includes('chawal') || lower.includes('arisi') || lower.includes('biyyam') || lower.includes('chal') || lower.includes('chokha') || lower.includes('akki')) return '🌾';
  if (lower.includes('water') || lower.includes('pani') || lower.includes('paani') || lower.includes('thanni') || lower.includes('neeru') || lower.includes('vellam')) return '💧';
  if (lower.includes('milk') || lower.includes('doodh') || lower.includes('dudh') || lower.includes('paal') || lower.includes('palu') || lower.includes('haalu')) return '🥛';
  if (lower.includes('biscuit') || lower.includes('cookies') || lower.includes('parle')) return '🍪';
  if (lower.includes('soap') || lower.includes('sabun') || lower.includes('lux') || lower.includes('lifebuoy') || lower.includes('dettol')) return '🧼';
  if (lower.includes('sugar') || lower.includes('cheeni') || lower.includes('chini') || lower.includes('sakhar') || lower.includes('khand')) return '🍬';
  if (lower.includes('tea') || lower.includes('chai') || lower.includes('chaha') || lower.includes('theeneer')) return '☕';
  if (lower.includes('oil') || lower.includes('tel') || lower.includes('fortune') || lower.includes('saffola')) return '🛢️';
  if (lower.includes('wheat') || lower.includes('gehu') || lower.includes('atta') || lower.includes('aashirvaad') || lower.includes('godhumai')) return '🌾';
  return '📦';
};

export const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  language,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onQuickUpdateStock,
  onOpenWholesaleOrder
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'low_stock' | 'in_stock'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const inv = t.inventory;
  const unitDict = UNIT_TRANSLATIONS[language] || UNIT_TRANSLATIONS.en;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredProducts = products.filter(p => {
    const isLow = p.quantity <= p.lowStockThreshold;
    if (filterMode === 'low_stock' && !isLow) return false;
    if (filterMode === 'in_stock' && isLow) return false;

    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const localizedName = getLocalizedProductName(p.name, language).toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      localizedName.includes(term) ||
      (p.hindiName && p.hindiName.toLowerCase().includes(term))
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'quantity') {
      comparison = a.quantity - b.quantity;
    } else if (sortField === 'price') {
      comparison = a.price - b.price;
    } else if (sortField === 'value') {
      comparison = (a.quantity * a.price) - (b.quantity * b.price);
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-6 select-none">
      
      {/* Header & Controls Strip */}
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 bg-slate-50/50">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center space-x-2.5">
            <span>{inv.title}</span>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {products.length} {t.stats.productsUnit}
            </span>
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            {inv.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={inv.searchPlaceholder}
              className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs font-semibold"
            />
          </div>

          {/* Filter Pills */}
          <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-100/90 p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterMode === 'all' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {inv.filterAll}
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('low_stock')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterMode === 'low_stock' ? 'bg-amber-100 text-amber-950 shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {inv.filterLowStock}
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('in_stock')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterMode === 'in_stock' ? 'bg-white text-emerald-950 shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {inv.filterInStock}
            </button>
          </div>

          {/* View Toggle */}
          <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-100/90 p-1 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* 📦 Wholesale WhatsApp Order Button */}
          {onOpenWholesaleOrder && (
            <button
              type="button"
              onClick={() => onOpenWholesaleOrder()}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-900 border border-emerald-300 rounded-2xl text-xs font-black shadow-2xs transition-all cursor-pointer active:scale-95"
              title="Reorder low stock from wholesaler via WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">WhatsApp PO</span>
              <span className="sm:hidden">PO</span>
            </button>
          )}

          {/* Add Product Button */}
          <button
            type="button"
            onClick={onAddProduct}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-2xl text-xs font-black shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{inv.addProduct}</span>
          </button>
        </div>
      </div>

      {/* 1. Table View */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                <th scope="col" className="py-3 px-4 sm:px-6 cursor-pointer hover:text-slate-900" onClick={() => handleSort('name')}>
                  <div className="flex items-center space-x-1">
                    <span>{inv.colProduct}</span>
                    {sortField === 'name' && (sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)}
                  </div>
                </th>
                <th scope="col" className="py-3 px-4 text-center cursor-pointer hover:text-slate-900" onClick={() => handleSort('quantity')}>
                  <div className="flex items-center justify-center space-x-1">
                    <span>{inv.colQuantity}</span>
                    {sortField === 'quantity' && (sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)}
                  </div>
                </th>
                <th scope="col" className="py-3 px-4 text-center">{inv.colUnit}</th>
                <th scope="col" className="py-3 px-4 text-right cursor-pointer hover:text-slate-900" onClick={() => handleSort('price')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>{inv.colPrice}</span>
                    {sortField === 'price' && (sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)}
                  </div>
                </th>
                <th scope="col" className="py-3 px-4 text-right cursor-pointer hover:text-slate-900" onClick={() => handleSort('value')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>{inv.colValue}</span>
                    {sortField === 'value' && (sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)}
                  </div>
                </th>
                <th scope="col" className="py-3 px-4 text-center">{inv.colStatus}</th>
                <th scope="col" className="py-3 px-4 text-right">{inv.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {sortedProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-bold">
                    {inv.noProducts}
                  </td>
                </tr>
              ) : (
                sortedProducts.map((product) => {
                  const isLow = product.quantity <= product.lowStockThreshold;
                  const totalVal = product.quantity * product.price;
                  const localizedName = getLocalizedProductName(product.name, language);
                  const localizedUnit = unitDict[product.unit] || product.unit;
                  const emoji = getProductEmoji(product.name);

                  return (
                    <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl p-1.5 rounded-xl bg-slate-100/80 border border-slate-200/80">{emoji}</span>
                          <div>
                            <span className="text-sm font-extrabold block text-slate-900">{localizedName}</span>
                            {product.name !== localizedName && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                {product.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-2xl px-2.5 py-1">
                          <button
                            type="button"
                            onClick={() => onQuickUpdateStock(product.id, -1)}
                            className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer active:scale-90"
                            title="Decrease 1"
                          >
                            <MinusCircle className="w-4 h-4" />
                          </button>
                          <span className={`font-black text-sm tabular-nums min-w-[28px] text-center ${isLow ? 'text-amber-800' : 'text-slate-900'}`}>
                            {product.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onQuickUpdateStock(product.id, 1)}
                            className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer active:scale-90"
                            title="Increase 1"
                          >
                            <PlusCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center font-bold text-slate-600">
                        <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-[11px]">
                          {localizedUnit}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 tabular-nums text-sm">
                        {formatINR(product.price)}
                      </td>

                      <td className="py-3.5 px-4 text-right font-black text-slate-900 tabular-nums text-sm">
                        {formatINR(totalVal)}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        {isLow ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-[11px] font-black bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>{inv.statusLowStock}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-[11px] font-black bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{inv.statusInStock}</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {isLow && onOpenWholesaleOrder && (
                            <button
                              type="button"
                              onClick={() => onOpenWholesaleOrder(product)}
                              className="p-1.5 text-emerald-700 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer"
                              title="Order on WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => onEditProduct(product)}
                            className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteProduct(product.id, localizedName)}
                            className="p-1.5 text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* 2. Cards Grid View */
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((product) => {
            const isLow = product.quantity <= product.lowStockThreshold;
            const localizedName = getLocalizedProductName(product.name, language);
            const localizedUnit = unitDict[product.unit] || product.unit;
            const emoji = getProductEmoji(product.name);

            return (
              <div
                key={product.id}
                className={`p-4 rounded-3xl border transition-all ${
                  isLow ? 'bg-amber-50/40 border-amber-300' : 'bg-white border-slate-200'
                } shadow-xs hover:shadow-md flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl p-2 rounded-2xl bg-slate-100 border border-slate-200">{emoji}</span>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">{localizedName}</h4>
                        <span className="text-xs text-slate-400 font-semibold">{product.name}</span>
                      </div>
                    </div>
                    {isLow ? (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-amber-100 text-amber-900">
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-emerald-100 text-emerald-900">
                        In Stock
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-3 p-3 bg-slate-50 rounded-2xl text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Price</span>
                      <span className="text-base font-black text-slate-900">{formatINR(product.price)}</span>
                      <span className="text-[10px] text-slate-500"> / {localizedUnit}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Stock Left</span>
                      <span className={`text-base font-black ${isLow ? 'text-amber-800' : 'text-slate-900'}`}>
                        {product.quantity} {localizedUnit}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="inline-flex items-center space-x-2 bg-slate-100 rounded-xl px-2 py-1">
                    <button
                      type="button"
                      onClick={() => onQuickUpdateStock(product.id, -1)}
                      className="text-slate-500 hover:text-slate-900"
                    >
                      <MinusCircle className="w-4 h-4" />
                    </button>
                    <span className="font-black text-xs">{product.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onQuickUpdateStock(product.id, 1)}
                      className="text-slate-500 hover:text-slate-900"
                    >
                      <PlusCircle className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-1">
                    {isLow && onOpenWholesaleOrder && (
                      <button
                        type="button"
                        onClick={() => onOpenWholesaleOrder(product)}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Order</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onEditProduct(product)}
                      className="p-1.5 text-slate-500 hover:text-blue-700"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
