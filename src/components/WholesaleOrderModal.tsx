import React, { useState, useEffect } from 'react';
import { ShoppingCart, Send, Copy, Check, Plus, Trash2, X, AlertTriangle, MessageSquare, Phone, Store, User, Sparkles } from 'lucide-react';
import { Product, ShopkeeperUser, SupportedLanguage, WholesaleOrderItem } from '../types';
import { PRESET_DISTRIBUTORS, buildLowStockOrderItems, formatWhatsAppOrderMessage, getWhatsAppShareUrl } from '../services/wholesaleService';
import { TRANSLATIONS } from '../services/translations';
import { logActivity } from '../services/database';

interface WholesaleOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currentUser: ShopkeeperUser | null;
  language: SupportedLanguage;
  preselectedProduct?: Product | null;
}

export const WholesaleOrderModal: React.FC<WholesaleOrderModalProps> = ({
  isOpen,
  onClose,
  products,
  currentUser,
  language,
  preselectedProduct
}) => {
  const [distributorName, setDistributorName] = useState(PRESET_DISTRIBUTORS[0].name);
  const [distributorPhone, setDistributorPhone] = useState(PRESET_DISTRIBUTORS[0].phone);
  const [items, setItems] = useState<WholesaleOrderItem[]>([]);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedAddProductId, setSelectedAddProductId] = useState('');

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const w = t.wholesale;

  // Initialize order items from low-stock or preselected product on modal open
  useEffect(() => {
    if (isOpen) {
      if (preselectedProduct) {
        setItems([
          {
            productId: preselectedProduct.id,
            productName: preselectedProduct.name,
            hindiName: preselectedProduct.hindiName,
            quantity: Math.max(10, preselectedProduct.lowStockThreshold * 4),
            unit: preselectedProduct.unit,
            currentStock: preselectedProduct.quantity
          }
        ]);
      } else {
        const autoItems = buildLowStockOrderItems(products);
        setItems(autoItems);
      }
      setCopied(false);
    }
  }, [isOpen, products, preselectedProduct]);

  if (!isOpen) return null;

  const handleDistributorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = PRESET_DISTRIBUTORS.find(d => d.id === e.target.value);
    if (found) {
      setDistributorName(found.name);
      setDistributorPhone(found.phone);
    } else if (e.target.value === 'custom') {
      setDistributorName('');
      setDistributorPhone('');
    }
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleSetExactQty = (productId: string, val: number) => {
    setItems(prev => prev.map(item => {
      if (item.productId === productId) {
        return { ...item, quantity: Math.max(1, val || 1) };
      }
      return item;
    }));
  };

  const handleRemoveItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.productId !== productId));
  };

  const handleAddProduct = () => {
    if (!selectedAddProductId) return;
    const prod = products.find(p => p.id === selectedAddProductId);
    if (!prod) return;

    if (items.some(i => i.productId === prod.id)) {
      handleUpdateQty(prod.id, 10);
    } else {
      setItems(prev => [
        ...prev,
        {
          productId: prod.id,
          productName: prod.name,
          hindiName: prod.hindiName,
          quantity: Math.max(10, prod.lowStockThreshold * 3),
          unit: prod.unit,
          currentStock: prod.quantity
        }
      ]);
    }
    setSelectedAddProductId('');
  };

  const messageText = formatWhatsAppOrderMessage({
    shopName: currentUser?.shopName || 'Sahayak Kirana Store',
    ownerName: currentUser?.ownerName || 'Store Manager',
    ownerPhone: currentUser?.phone || '9876543210',
    distributorName,
    items,
    notes
  });

  const handleSendWhatsApp = async () => {
    const url = getWhatsAppShareUrl(distributorPhone, messageText);
    await logActivity('WHOLESALE_ORDER', `Sent WhatsApp wholesale order for ${items.length} items to ${distributorName || 'Supplier'}`);
    window.open(url, '_blank');
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const availableToAdd = products.filter(p => !items.some(i => i.productId === p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="bg-emerald-900 text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-1.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-md">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {w.title}
                </h2>
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-700/80 text-emerald-100 text-[10px] font-extrabold border border-emerald-600">
                  <MessageSquare className="w-3 h-3 text-emerald-300" />
                  <span>WhatsApp PO</span>
                </span>
              </div>
              <p className="text-xs text-emerald-200 font-medium">
                {w.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-emerald-200 mt-2 bg-emerald-950/50 px-3 py-1.5 rounded-xl border border-emerald-800">
            <span>Store: <strong className="text-white">{currentUser?.shopName || 'Sahayak Store'}</strong></span>
            <span>•</span>
            <span>Owner: <strong className="text-white">{currentUser?.ownerName || 'Ramesh'}</strong></span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* 1. Distributor Contact Selection */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800">
                {w.distributorLabel}
              </label>
              <span className="text-[10px] font-semibold text-slate-500">
                Presets available
              </span>
            </div>

            <select
              onChange={handleDistributorSelect}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
            >
              {PRESET_DISTRIBUTORS.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.category})
                </option>
              ))}
              <option value="custom">✏️ Enter Custom Wholesaler / Distributor...</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <input
                  type="text"
                  value={distributorName}
                  onChange={(e) => setDistributorName(e.target.value)}
                  placeholder="Wholesaler Name (e.g. Shree Ganesh Traders)"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  maxLength={10}
                  value={distributorPhone}
                  onChange={(e) => setDistributorPhone(e.target.value)}
                  placeholder="10-digit WhatsApp Mobile"
                  className="w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Order Items List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                <span>{w.orderItemsTitle}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                  {items.length} items
                </span>
              </h3>

              {items.length > 0 && (
                <button
                  type="button"
                  onClick={() => setItems([])}
                  className="text-[11px] text-rose-600 hover:underline font-semibold cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center text-xs text-amber-800 font-medium">
                {w.noLowStockMessage}
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-2xs hover:border-slate-300 transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {item.productName} {item.hindiName ? `(${item.hindiName})` : ''}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {w.currentStockLabel}: <strong className="text-slate-700">{item.currentStock} {item.unit}</strong>
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.productId, -5)}
                          className="w-6 h-6 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 cursor-pointer"
                          title="-5"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => handleSetExactQty(item.productId, parseInt(e.target.value) || 1)}
                          className="w-12 text-center text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.productId, 5)}
                          className="w-6 h-6 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 cursor-pointer"
                          title="+5"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-slate-600 min-w-[28px]">
                        {item.unit}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.productId)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add more products dropdown */}
            {availableToAdd.length > 0 && (
              <div className="mt-3 flex items-center space-x-2">
                <select
                  value={selectedAddProductId}
                  onChange={(e) => setSelectedAddProductId(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                >
                  <option value="">{w.selectProductPlaceholder}</option>
                  {availableToAdd.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.hindiName || p.unit}) • Stock: {p.quantity} {p.unit}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleAddProduct}
                  disabled={!selectedAddProductId}
                  className="px-3 py-2 bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Delivery Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              {w.notesLabel}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={w.notesPlaceholder}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
            />
          </div>

          {/* 4. Live WhatsApp Message Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>{w.previewTitle}</span>
              </label>

              <button
                type="button"
                onClick={handleCopyText}
                className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center space-x-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? w.copiedSuccess : w.copyTextBtn}</span>
              </button>
            </div>

            <div className="bg-[#EFEAE2] p-3.5 rounded-2xl border border-[#D1D7DB] text-xs font-sans text-slate-800 shadow-inner whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
              <div className="bg-white p-3 rounded-xl shadow-xs border border-slate-200">
                {messageText}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
            Total <strong>{items.length} items</strong> ready to dispatch
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyText}
              className="flex-1 sm:flex-none px-3.5 py-2.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={handleSendWhatsApp}
              disabled={items.length === 0}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{w.sendWhatsAppBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
